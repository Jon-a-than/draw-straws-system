import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import TDesign from 'tdesign-mobile-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/layouts'
import router from '@/router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(TDesign)
app.use(router)

app.mount('#app')
