import type { RouteRecordRaw } from 'vue-router'

export const DRAW_STRAWS_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/drawStraws',
  children: [
    {
      path: '',
      name: 'DrawStrawsForm',
      component: () => import('@/pages/DrawStraws/Form'),
      meta: { title: '开始抽签', showBack: false }
    },
    {
      path: 'result',
      name: 'DrawStrawsResult',
      component: () => import('@/pages/DrawStraws/Result'),
      meta: { title: '抽签结果', showBack: true }
    }
  ]
}
