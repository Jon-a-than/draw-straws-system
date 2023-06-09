import { useRequest } from 'alova'
import { RouterView } from 'vue-router'
import { DRAW_STRAWS } from './constants/keys'
import { defineComponent, provide } from 'vue'
import { drawStraws } from '@/servers/apis/drawStraws'

export default defineComponent({
  setup() {
    const { loading, data, error, send } = useRequest(drawStraws, { immediate: false })
    provide(DRAW_STRAWS, { loading, data, error, send })

    return () => (
      <div h-full mx-auto max-w-lg flex="~ col justify-center">
        <RouterView />
      </div>
    )
  }
})
