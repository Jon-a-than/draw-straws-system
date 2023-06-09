import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <div h-full mx-auto max-w-lg flex="~ col justify-center">
        <RouterView />
      </div>
    )
  }
})
