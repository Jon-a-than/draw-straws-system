import classes from './index.module.css'

import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Navbar } from 'tdesign-mobile-vue'

export default defineComponent(() => {
  const route = useRoute()
  const router = useRouter()
  async function handleBack() {
    await router.push(route.meta.defaultPath as string)
  }

  return () => (
    <Navbar
      fixed={false}
      onLeftClick={handleBack}
      style="--td-navbar-right: 0px;"
      title={route.meta.title}
      class={classes.headerBar}
      leftArrow={route.meta.showBack}
    ></Navbar>
  )
})
