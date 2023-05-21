import { defineComponent, reactive, ref } from 'vue'
import { DrawStrawsType } from '@/interfaces/drawStraws'
import { useRoute } from 'vue-router'

import type { CreateDrawStrawsPayload } from '@/interfaces/drawStraws'

export default defineComponent({
  setup() {
    const poolType = ref<DrawStrawsType>(0)

    const route = useRoute()
    const CreateDrawStrawsPayload = reactive<CreateDrawStrawsPayload>({
      title: route.query.title as string,
      total: route.query.total as string,
      setup: []
    })

    console.log(CreateDrawStrawsPayload)
    return () => (
      <>
        <form flex="~ col items-stretch gap-4" text-center></form>
      </>
    )
  }
})
