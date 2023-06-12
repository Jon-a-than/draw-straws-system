import type { RouteRecordRaw } from 'vue-router'

export const SEARCH_RESULT_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/search',
  meta: { defaultPath: '/search', title: '查询奖池', showBack: false },
  children: [
    {
      path: '',
      name: 'Search',
      component: () => import('@/pages/List')
    },
    {
      path: 'pool-info',
      name: 'PoolResult',
      component: () => import('@/pages/Reports/PoolInfo'),
      meta: { title: '奖池信息', showBack: true },
      beforeEnter({ query }, _, next) {
        if (!query.uuid || !query.type) next('/404')
        else next()
      }
    },
    {
      path: 'draw-straws-info',
      name: 'DrawStrawsInfo',
      component: () => import('@/pages/Reports/DrawStraws'),
      meta: { title: '抽签信息', showBack: true },
      beforeEnter({ query }, _, next) {
        if (!query.uuid || !query.uid) next('/404')
        else next()
      }
    }
  ]
}
