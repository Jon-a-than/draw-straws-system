import type { RouteRecordRaw } from 'vue-router'

export const DRAW_STRAWS_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/',
  component: () => import('@/pages/DrawStraws'),
  children: [
    {
      path: '',
      name: 'DrawStraws',
      component: () => import('@/pages/DrawStraws/views/JoinPool'),
      meta: { title: '加入奖池', showBack: false }
    },
    {
      path: 'draw-straws-form',
      name: 'DrawStrawsForm',
      component: () => import('@/pages/DrawStraws/views/UserForm'),
      meta: { title: '个人信息', showBack: true },
      beforeEnter: ({ query }, _, next) => {
        if (
          query &&
          query.uuid?.length === 36 &&
          query?.type &&
          +query.type >= 0 &&
          +query.type <= 4
        )
          next()
        else next({ name: 'DrawStraws' })
      }
    },
    {
      path: 'draw-straws-result',
      name: 'DrawStrawsResult',
      component: () => import('@/pages/DrawStraws/views/ResultCard'),
      meta: { title: '抽签结果', showBack: true }
    }
  ]
}
