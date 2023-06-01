import { createRouter, createWebHistory } from 'vue-router'
import DrawStraws from '@/pages/DrawStraws/Form'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/draw-straws'
    },
    {
      path: '/draw-straws',
      name: 'DrawStraws',
      component: DrawStraws
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('@/pages/Create')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/pages/List')
    }
  ]
})

export default router
