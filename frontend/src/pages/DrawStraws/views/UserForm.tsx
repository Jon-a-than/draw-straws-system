import { useRequest } from 'alova'
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { drawStraws } from '@/servers/apis/drawStraws'

import Button from '@/components/base/Button'
import Form from '@/components/base/Form'
import Input from '@/components/base/Input'

import type { DrawStrawsPayload } from '@/interfaces/drawStraws'

export default defineComponent({
  setup() {
    const route = useRoute()
    const formData = reactive<DrawStrawsPayload>({
      type: +route.query.type! as 0 | 1 | 2 | 3 | 4,
      uuid: route.query.uuid! as string,
      name: '',
      role: 'role'
    })

    const router = useRouter()
    const { loading, error, data, send } = useRequest(drawStraws, { immediate: false })
    async function handleDrawStraws() {
      console.log(loading, error, data)
      if (formData.name === '' || (formData.type === 3 && formData.role === '')) return

      await send(formData)
      if (error.value) return console.log(error.value)

      console.log(data.value)
      router.push({ name: 'DrawStrawsResult', query: data.value })
    }

    return () => (
      <Form>
        <Input h-10 px-2 v-model={formData.name} placeholder="请输入你的昵称">
          {{ prefix: () => <i text-lg mx-2 i-ic-outline-gas-meter /> }}
        </Input>
        {formData.type == 3 && (
          <Input h-10 px-2 v-model={formData.role} placeholder="请输入小组角色">
            {{ prefix: () => <i text-lg mx-2 i-mdi-tag-heart-outline /> }}
          </Input>
        )}
        <Button
          onClick={handleDrawStraws}
          mt={formData.type == 3 ? 4 : 18}
          mx-auto
          h-10
          w-50
          type="button"
        >
          <i text="lg black" mr-2 i-tabler-pin />
          抽签
        </Button>
      </Form>
    )
  }
})
