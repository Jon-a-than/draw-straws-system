const enum DrawStrawsType {
  DRAW_STRAWS,
  DRAW_STRAWS_PUT_BACK,
  CREATE_GROUP,
  CREATE_GROUP_WITH_ROLE,
  SORT
}

interface IPoolSetup {
  tag: string
  limit: number
}

interface IDrawStrawsPool {
  /** @desc 奖池id */
  _id: string
  /** @desc 奖池类型 */
  type: DrawStrawsType
  /** @desc 奖池总数 */
  total: number
  /** @desc 奖池设置 */
  setup: IPoolSetup[]
}

export type { DrawStrawsType, IDrawStrawsPool, IPoolSetup }
