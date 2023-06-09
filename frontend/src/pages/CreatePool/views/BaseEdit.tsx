import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import Button from '@/components/base/Button'
import Form from '@/components/base/Form'
import Input from '@/components/base/Input'

import type { CreateDrawStrawsPayload } from '@/interfaces/drawStraws'

export default defineComponent({
  setup() {
    const formDate = reactive<Omit<CreateDrawStrawsPayload, 'setup'>>({ title: '', total: '' })

    const router = useRouter()
    async function handleSubmit() {
      if (formDate.title === '' || formDate.total === '') return
      await router.push({ name: 'CreatePoolSettings', query: formDate })
    }

    return () => (
      <Form>
        <Input v-model={formDate.title} h-10 px-2 placeholder="请输入奖池标题">
          {{ prefix: () => <i text-lg mx-2 i-bx-ball /> }}
        </Input>
        <Input v-model={formDate.total} type="number" h-10 px-2 placeholder="请输入奖池签数">
          {{ prefix: () => <i text-lg mx-2 i-octicon-beaker-16 /> }}
        </Input>

        <Button onClick={handleSubmit} mt-4 mx-auto h-10 w-50 type="button">
          <i text="lg black" mr-2 i-ic-outline-add-box />
          创建
        </Button>
      </Form>
    )
  }
})
