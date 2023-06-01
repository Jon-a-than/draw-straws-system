import './index.css'

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import Footer from './Footer'
import Header from './Header'

export default defineComponent({
  setup() {
    return () => (
      <>
        <Header />
        <main>
          <RouterView />
        </main>
        <Footer />
      </>
    )
  }
})
