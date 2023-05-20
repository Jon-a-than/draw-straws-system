import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import HeaderBar from './components/HeaderBar'
import TabBar from './components/TabBar'

export default defineComponent({
  setup() {
    return () => (
      <>
        <HeaderBar />
        <main>
          <RouterView />
        </main>
        <TabBar />
      </>
    )
  }
})
