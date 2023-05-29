interface PoolConfig {
  title: string
  total: 100
  type: number
  setup: { tag: string; limit: number }[]
}

export const POOL_CONFIG: PoolConfig[] = [
  {
    title: '不放回抽奖',
    total: 100,
    type: 0,
    setup: [
      { tag: '一等奖', limit: 10 },
      { tag: '二等奖', limit: 20 },
      { tag: '三等奖', limit: 30 },
      { tag: '参与奖', limit: 40 }
    ]
  },
  {
    title: '放回抽奖',
    total: 100,
    type: 1,
    setup: [
      { tag: '一等奖', limit: 10 },
      { tag: '二等奖', limit: 20 },
      { tag: '三等奖', limit: 30 },
      { tag: '参与奖', limit: 40 }
    ]
  },
  {
    title: '无角色小组',
    total: 100,
    type: 2,
    setup: [
      {
        limit: 20,
        tag: 'undefined'
      }
    ]
  },
  {
    title: '分角色小组',
    total: 100,
    type: 3,
    setup: [
      { tag: 'Frontend', limit: 1 },
      { tag: 'Backend', limit: 2 },
      { tag: 'DevOps', limit: 2 }
    ]
  },
  {
    title: '排序',
    total: 100,
    type: 4,
    setup: []
  }
]
