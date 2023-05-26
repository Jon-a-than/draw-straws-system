import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import '@/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/layout'
import router from '@/router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
