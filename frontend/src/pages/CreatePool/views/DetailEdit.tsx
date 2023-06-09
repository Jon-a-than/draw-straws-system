import { defineComponent, inject, reactive, ref, watch } from 'vue'
import { DrawStrawsType } from '@/interfaces/drawStraws'
import { useRoute, useRouter } from 'vue-router'
import { DRAW_STRAWS } from '../constants/keys'

import Form from '@/components/base/Form'
import Input from '@/components/base/Input'
import Button from '@/components/base/Button'

import type { CreateDrawStrawsPayload } from '@/interfaces/drawStraws'

export default defineComponent({
  setup() {
    const poolType = ref<DrawStrawsType>(0)

    const route = useRoute()
    const createDrawStrawsPayload = reactive<CreateDrawStrawsPayload>({
      title: route.query.title as string,
      total: route.query.total as string,
      setup: []
    })
    function handleAdd() {
      createDrawStrawsPayload.setup.push({ tag: '', limit: '0' })
    }

    const { push } = useRouter()
    const { send } = inject(DRAW_STRAWS)!
    async function handleSubmit() {
      send({ ...createDrawStrawsPayload, type: poolType.value })
      await push({ name: 'CreatePoolResult' })
    }

    return () => (
      <Form>
        <h2>{createDrawStrawsPayload.title}</h2>
        <div flex="~ gap-4">
          <select
            border="solid #f1939c"
            text="lg amber"
            class="flex-1 rounded bg-#c04851 px-2 font-bold focus:outline-none"
            v-model={poolType.value}
          >
            <option value="0">抽签模式</option>
            <option value="2">创建小组</option>
            <option value="4">队列排序</option>
          </select>
          <Button onclick={handleAdd} type="button" class="h-10 w-10 rounded-full">
            <i i-mdi-add size="15" text="amber" />
          </Button>
        </div>

        {createDrawStrawsPayload.setup.map((_, index) => (
          <div flex="~ col items-stretch gap-1" key={index}>
            <Input px-2 v-model={createDrawStrawsPayload.setup[index].tag} />
            <Input px-2 v-model={createDrawStrawsPayload.setup[index].limit} type="number" />
          </div>
        ))}

        <Button type="button" onClick={handleSubmit}>
          发布
        </Button>
      </Form>
    )
  }
})
