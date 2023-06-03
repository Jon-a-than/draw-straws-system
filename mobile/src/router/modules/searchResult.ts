import type { RouteRecordRaw } from 'vue-router'

export const SEARCH_RESULT_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/search',
  name: 'Search',
  meta: { defaultPath: '/search', title: '查询奖池', showBack: false },
  children: [
    {
      path: '',
      component: () => import('@/pages/Search/List')
    },
    {
      path: 'result',
      component: () => import('@/pages/Search/Result')
    }
  ]
}
