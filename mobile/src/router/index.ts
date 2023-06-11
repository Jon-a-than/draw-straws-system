import { createRouter, createWebHistory } from 'vue-router'
import { CREATE_POOL_ROUTE } from './modules/createPool'
import { DRAW_STRAWS_ROUTE } from './modules/drawStraws'
import { SEARCH_RESULT_ROUTE } from './modules/searchResult'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/draw-straws'
    },
    DRAW_STRAWS_ROUTE,
    CREATE_POOL_ROUTE,
    SEARCH_RESULT_ROUTE
  ]
})

export default router
