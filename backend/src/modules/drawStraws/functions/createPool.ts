import { DrawStrawsType } from '@/interfaces/drawStraws.interface'

import {
  DrawStrawsPool,
  IDrawStrawsRedisValue,
  IPoolItem,
  SortPool
} from '../interfaces/drawStrawsRedis.interface'

import type { ICreateDrawStrawsDto, IUUID } from '@/interfaces/drawStraws.interface'

type CreatePool = (payload: ICreateDrawStrawsDto & Record<'uuid', IUUID>) => {
  key: string
  value: IDrawStrawsRedisValue
}

export const createPool: CreatePool = function ({ title, uuid, type, total, setup }) {
  let pool: IPoolItem[] = []

  switch (true) {
    case type == DrawStrawsType.SORT:
      pool = new Array(total).fill(0).map<SortPool>((_, i) => `${i}`)
      break
    case [DrawStrawsType.DRAW_STRAWS, DrawStrawsType.DRAW_STRAWS_PUT_BACK].includes(type):
      pool = setup.map<DrawStrawsPool>(({ tag, limit }) => `${tag}$${limit}`)
      break
    case type == DrawStrawsType.CREATE_GROUP_WITH_ROLE:
      const group = total / setup.reduce((pre, { limit }) => limit + pre, 0)
      setup.forEach(({ tag, limit }) => pool.push(...createGroup(group, `$${limit}$${tag}`)))
      break
    case type == DrawStrawsType.CREATE_GROUP:
      pool = createGroup(total / setup[0].limit, `$${setup[0].limit}`)
      break
  }

  return { key: `${uuid}$${type}`, value: { title, pool, uid: total } }
}

function createGroup<T extends string, K extends IPoolItem>(group: number, suffix: T): K[] {
  const res: K[] = []
  for (let i = 0; i < group; i++) res.push(<K>(<unknown>(i + suffix)))

  return res
}
