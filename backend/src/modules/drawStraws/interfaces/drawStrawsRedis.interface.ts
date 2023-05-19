type Tag<T> = T
type Role = string
type GroupId = number
type Allowance = number

export type DrawStrawsPool = `${Tag<string>}$${Allowance}`
export type DrawStrawsPutBackPool = DrawStrawsPool
export type CreateGroupPool = `${GroupId}$${Allowance}`
export type CreateGroupWithRolePool = `${GroupId}$${Allowance}$${Role}`
export type SortPool = `${Tag<number>}`

type IPoolItem =
  | CreateGroupPool
  | CreateGroupWithRolePool
  | DrawStrawsPool
  | DrawStrawsPutBackPool
  | SortPool

interface IDrawStrawsRedisValue {
  uid: number
  title: string
  pool: IPoolItem[]
}

export type { IDrawStrawsRedisValue, IPoolItem }
