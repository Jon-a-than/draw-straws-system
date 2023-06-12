import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import TDesign from 'tdesign-mobile-vue'

import App from '@/layouts'
import router from '@/router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(TDesign)
app.use(router)

app.mount('#app')
