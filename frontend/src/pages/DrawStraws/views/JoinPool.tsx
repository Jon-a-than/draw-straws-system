import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import Form from '@/components/base/Form'

export default defineComponent({
  setup() {
    const uuid = ref<string>('')

    const router = useRouter()
    async function handleSubmit() {
      const validateRes = validateKey(uuid.value)

      return 'error' in validateRes
        ? console.log(validateRes.error)
        : await router.push({ name: 'DrawStrawsForm', query: validateRes })
    }

    return () => (
      <Form>
        <Input h-10 px-2 v-model={uuid.value} placeholder="请输入奖池口令">
          {{ prefix: () => <i text-lg mx-2 i-ic-outline-vpn-key /> }}
        </Input>
        <Button mt-18 mx-auto h-10 w-50 type="button" onClick={handleSubmit}>
          <i text="lg black" mr-2 i-iconoir-xray-view />
          加入
        </Button>
      </Form>
    )
  }
})

function validateKey(key: string): { uuid: string; type: number } | { error: unknown } {
  if (key === '') return { error: 'UUID为空' }

  const type = +key.split('$').at(-1)!
  if (isNaN(type) || type > 4 || type < 0 || key.length !== 38) return { error: '口令错误' }

  return { uuid: key.slice(0, -2), type }
}
