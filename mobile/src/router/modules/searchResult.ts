import type { RouteRecordRaw } from 'vue-router'

export const SEARCH_RESULT_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/search',
  meta: { defaultPath: '/search', title: '查询奖池', showBack: false },
  children: [
    {
      path: '',
      name: 'Search',
      component: () => import('@/pages/Search/List')
    },
    {
      path: 'result',
      name: 'PoolResult',
      component: () => import('@/pages/Search/Result')
    }
  ]
}
