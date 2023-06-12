import type { RouteRecordRaw } from 'vue-router'

export const DRAW_STRAWS_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/draw-straws',
  meta: { defaultPath: '/draw-straws', title: '开始抽签', showBack: false },
  children: [
    {
      path: '',
      name: 'DrawStrawsForm',
      component: () => import('@/pages/Forms/DrawStraws')
    }
  ]
}
