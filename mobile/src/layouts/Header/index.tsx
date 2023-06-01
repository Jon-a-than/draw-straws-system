import './index.css'

import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import { Navbar } from 'tdesign-mobile-vue'

export default defineComponent(() => {
  const route = useRoute()

  return () => <Navbar title={'Test'} class="bg-[#c04851]"></Navbar>
})
