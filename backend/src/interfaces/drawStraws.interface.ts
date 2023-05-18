/** @desc 奖池类型枚举 */
const enum DrawStrawsType {
  DRAW_STRAWS,
  DRAW_STRAWS_PUT_BACK,
  CREATE_GROUP,
  CREATE_GROUP_WITH_ROLE,
  SORT
}

/** @desc 抽签模型通用接口 */
interface DrawStrawsBase {
  /** @desc 奖池名称 */
  title: string
  /** @desc 奖池类型 */
  type: DrawStrawsType
  /** @desc 奖池总数 */
  total: number
}

/** @desc 奖池设置 */
interface IPoolSetup {
  /** @desc 签名 */
  tag: string
  /** @dessc 签数 */
  limit: number
}

interface ICreateDrawStrawsDto extends DrawStrawsBase {
  /** @desc 奖池设置 */
  setup: IPoolSetup[]
}

interface IDrawStrawsListItem {
  /** @desc 用户uid */
  uid: number
  /** @desc 用户昵称 */
  name: string
  /** @desc 中签标签 */
  tag: string
}

/** @desc 数据库存储结构 */
interface IDrawStrawsSchema extends DrawStrawsBase {
  /** @desc 奖池id */
  _id: string
  /** @desc 抽签结果列表 */
  list: IDrawStrawsListItem[]
}

type IUUID = `${string}-${string}-${string}-${string}-${string}`
type IUUIDWithType = `${IUUID}$${number}`

export { DrawStrawsType }

export type {
  ICreateDrawStrawsDto,
  IDrawStrawsListItem,
  IDrawStrawsSchema,
  IPoolSetup,
  IUUID,
  IUUIDWithType
}
