import './index.css'

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import Footer from './Footer'
import Header from './Header'
import { Message } from 'tdesign-mobile-vue'

export default defineComponent(() => {
  return () => (
    <>
      <Header />
      <main>
        <Message class="global-message" />
        <RouterView />
      </main>
      <Footer />
    </>
  )
})
