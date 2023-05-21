import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div h-full mx-auto max-w-lg flex="~ col justify-center">
        <RouterView />
      </div>
    )
  }
})
