import type { RouteRecordRaw } from 'vue-router'

export const CREATE_DRAW_STRAWS_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/create',
  children: [
    {
      path: '',
      component: () => import('@/pages/CreatePool'),
      children: [
        {
          path: '',
          name: 'CreatePool',
          component: () => import('@/pages/CreatePool/views/BaseEdit'),
          meta: { title: '创建奖池', showBack: false }
        },
        {
          path: 'settings',
          name: 'CreatePoolSettings',
          component: () => import('@/pages/CreatePool/views/DetailEdit'),
          meta: { title: '奖池设置', showBack: true },
          beforeEnter: (to, _, next) => {
            if (to.query && to.query.total) next()
            else next({ name: 'CreatePool' })
          }
        }
      ]
    }
  ]
}
