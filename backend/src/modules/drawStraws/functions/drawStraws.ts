import { DrawStrawsType } from '@/interfaces/drawStraws.interface'

import type {
  CreateGroupPool,
  CreateGroupWithRolePool,
  DrawStrawsPool,
  DrawStrawsPutBackPool,
  IPoolItem
} from '../interfaces/drawStrawsRedis.interface'

type DrawStrawsRes =
  | { newPool: string[]; tag: string; error?: string }
  | { newPool?: string[]; tag?: string; error: string }
type DrawStraws = (pool: IPoolItem[], type: DrawStrawsType, role?: string) => DrawStrawsRes

export const drawStraws: DrawStraws = function (pool, type, role) {
  switch (type) {
    case DrawStrawsType.DRAW_STRAWS:
      return drawStrawsWithoutPutPack(pool as DrawStrawsPool[])
    case DrawStrawsType.DRAW_STRAWS_PUT_BACK:
      return drawStrawsPutBack(pool as DrawStrawsPutBackPool[])
    case DrawStrawsType.CREATE_GROUP:
      return createGroup(pool as CreateGroupPool[])
    case DrawStrawsType.CREATE_GROUP_WITH_ROLE:
      return createGroupWithRole(pool as CreateGroupWithRolePool[], role)
    case DrawStrawsType.SORT:
      return { tag: pool.splice(randomInt(0, pool.length - 1), 1)[0], newPool: pool }
  }
}

/**
 * @desc 不放回的抽签
 * @param pool 奖池
 * @returns 签名
 */
function drawStrawsWithoutPutPack(pool: DrawStrawsPool[]): DrawStrawsRes {
  const index = randomInt(0, pool.length - 1)
  const tmp = pool[index].split('$')
  const [tag, allowance] = [tmp.slice(0, -1).join('$'), tmp.at(-1)]
  if (allowance == '1') pool.splice(index, 1)
  else pool[index] = `${tag}$${+allowance - 1}`
  return { tag, newPool: pool }
}

/**
 * @desc 有放回的抽签
 * @param pool 奖池
 * @returns 签名
 */
function drawStrawsPutBack(pool: DrawStrawsPutBackPool[]): DrawStrawsRes {
  const total = pool.reduce((total, item) => total + +item.split('$').at(-1), 0)
  let random = randomInt(0, total)
  for (let i = 0; i < pool.length; i++) {
    random -= +pool[i].split('$').at(-1)
    if (random > 0) continue
    return { tag: pool[i].split('$').slice(0, -1).join('$'), newPool: pool }
  }
}

/**
 * @desc 随机加入小组
 * @param pool 剩余小组
 * @returns tag: 小组id
 */
function createGroup(pool: CreateGroupPool[]): DrawStrawsRes {
  const index = randomInt(0, pool.length - 1)
  const [tag, allowance] = pool[index].split('$')
  if (allowance === '1') pool.splice(index, 1)
  else pool[index] = `${+tag}$${+allowance - 1}`

  return { tag, newPool: pool }
}

/**
 * @desc 随机加入小组（区分角色）
 * @param pool 剩余小组角色
 * @param role 用户角色
 * @return tag: 小组id
 */
function createGroupWithRole(pool: CreateGroupWithRolePool[], role: string): DrawStrawsRes {
  pool.sort(() => Math.random() - 0.5)
  const index = pool.findIndex((item) => item.split('$').slice(2).join('$') == role)
  if (index == -1) return { error: `未查询到需要 ${role} 的小组` }

  const [tag, allowance] = pool[index].split('$')
  if (allowance === '1') pool.splice(index, 1)
  else pool[index] = `${+tag}$${+allowance - 1}$${role}`

  return { tag, newPool: pool }
}

/**
 * @desc 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
function randomInt(min: number, max: number) {
  return ~~(Math.random() * (max - min + 1))
}
