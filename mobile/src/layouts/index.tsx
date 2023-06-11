import './index.css'

import { NOTICE } from '@/constants/provieKey'
import { useNotice } from '@/hooks/useNotice'
import { defineComponent, provide } from 'vue'

import { RouterView } from 'vue-router'
import Footer from './Footer'
import Header from './Header'

export default defineComponent(() => {
  const { visible, setVisible, type, message, setMessage } = useNotice()
  provide(NOTICE, { setMessage, setVisible })
  return () => (
    <>
      <Header />
      <t-notice-bar visible={visible.value} theme={type.value} content={message.value}>
        {{ suffixIcon: () => <i i-ic-round-close onClick={() => setVisible()} /> }}
      </t-notice-bar>
      <main>
        <RouterView />
      </main>
      <Footer />
    </>
  )
})
