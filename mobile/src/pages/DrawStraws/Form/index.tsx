import { useRequest } from 'alova'
import { defineComponent, reactive } from 'vue'
import { drawStraws } from '@/services/drawStraws'
import { Button, Form, FormItem, Input } from 'tdesign-mobile-vue'

import type { FormRules, SubmitContext } from 'tdesign-mobile-vue/es/form'
import type { DrawStrawsPayload } from '@/interfaces/api'

export default defineComponent(() => {
  const formData = reactive<DrawStrawsPayload>({
    type: '0',
    uuid: '',
    name: '',
    role: ''
  })
  const formRoles: FormRules<DrawStrawsPayload> = {
    uuid: [
      {
        validator(uuid: string, ...args: unknown[]) {
          console.log('uuid', uuid, args)
          formData.type = uuid?.split('$')?.[1] ?? '0'
          return +formData.type <= 4 && +formData.type >= 0
        },
        message: '口令错误'
      }
    ],
    name: [{ max: 50, message: '名称长度过长' }],
    role: [
      { validator: (role) => role || formData.type != '3' },
      { max: 50, message: '角色名过长' }
    ]
  }

  const { data, send, error } = useRequest(drawStraws, { immediate: false })
  function handleSubmit({ validateResult, ...args }: SubmitContext): void {
    console.log(validateResult, args)
    // await send({ ...formData })
    // if (error.value) {
    //   console.log(1)
    // }
  }

  return () => (
    <Form rules={formRoles} onSubmit={handleSubmit} class="mt-[calc(50vh-180px)]">
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
