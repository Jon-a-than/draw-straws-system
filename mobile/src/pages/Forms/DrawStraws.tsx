import { NOTICE } from '@/constants/provieKey'
import { drawStraws } from '@/services/drawStraws'
import { useDrawStrawsListStore } from '@/stores/drawStrawsList'
import { validateDrawStrawsForm } from '@/validators/form'
import { useRequest } from 'alova'
import { Button, Form, FormItem, Input } from 'tdesign-mobile-vue'
import { defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { DrawStrawsPayload } from '@/interfaces/api'

export default defineComponent(() => {
  const formData = reactive<Omit<DrawStrawsPayload, 'type'>>({ uuid: '', name: '', role: '' })

  const router = useRouter()
  const { setMessage } = inject(NOTICE)!
  const drawStrawsListStore = useDrawStrawsListStore()
  const { data, send, error } = useRequest(drawStraws, { immediate: false })
  async function handleSubmit() {
    const payload = validateDrawStrawsForm(formData)
    if (typeof payload === 'string') return setMessage(payload, 'error')

    await send(payload)
    if (error.value || data.value?.message) {
      return setMessage(error?.value?.message ?? '' + data.value?.message, 'error')
    }

    drawStrawsListStore.addDrawStrawsItem({ ...data.value, uuid: payload.uuid, type: payload.type })
    await router.push({
      name: 'DrawStrawsInfo',
      query: { uuid: payload.uuid, uid: data.value.uid }
    })
  }

  return () => (
    <Form onSubmit={handleSubmit} class="mt-[calc(50vh-180px)]">
      <FormItem label="口令" name="uuid">
        <Input v-model={formData.uuid} placeholder="请输入uuid" />
      </FormItem>
      <FormItem label="昵称" name="name">
        <Input v-model={formData.name} placeholder="请输入昵称" />
      </FormItem>
      <FormItem v-show={formData.uuid.split('$')?.[1] == '3'} label="角色" name="role">
        <Input v-model={formData.role} placeholder="请输入角色" />
      </FormItem>
      <div pa-4>
        <Button theme="primary" type="submit" block>
          开始抽签
        </Button>
      </div>
    </Form>
  )
})
