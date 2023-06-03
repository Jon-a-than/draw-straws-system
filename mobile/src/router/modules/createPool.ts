import type { RouteRecordRaw } from 'vue-router'

export const CREATE_POOL_ROUTE: Readonly<RouteRecordRaw> = {
  path: '/create-pool',
  meta: { defaultPath: '/create-pool', title: '创建奖池', showBack: false },
  children: [
    {
      path: '',
      name: 'CreatePool',
      component: () => import('@/pages/Create/Form')
    },
    {
      path: 'result',
      name: 'CreateResult',
      component: () => import('@/pages/Create/Result'),
      meta: { title: '创建结果', showBack: true }
    }
  ]
}
