import type { RouteRecordRaw } from 'vue-router'

export const DRAW_STRAWS_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/draw-straws',
  meta: { defaultPath: '/draw-straws', title: '开始抽签', showBack: false },
  children: [
    {
      path: '',
      name: 'DrawStrawsForm',
      component: () => import('@/pages/DrawStraws/Form')
    },
    {
      path: 'result',
      name: 'DrawStrawsResult',
      component: () => import('@/pages/DrawStraws/Result'),
      meta: { title: '抽签结果', showBack: true }
    }
  ]
}
