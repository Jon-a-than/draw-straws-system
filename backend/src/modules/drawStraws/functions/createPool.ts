import { DrawStrawsType, ICreateDrawStrawsDto, IUUID } from '@/interfaces/drawStraws.interface'

type CreatePool = (payload: ICreateDrawStrawsDto & Record<'uuid', IUUID>) => {
  key: string
  value: {
    title: string
    pool: string[]
  }
}

export const createPool: CreatePool = function ({ title, uuid, type, total, setup }) {
  let pool = []

  switch (true) {
    case type == DrawStrawsType.SORT:
      pool = new Array(total).fill(0).map((_, i) => i + '')
      break
    case [DrawStrawsType.DRAW_STRAWS, DrawStrawsType.DRAW_STRAWS_PUT_BACK].includes(type):
      pool = setup.map(({ tag, limit }) => `${tag}$${limit}`)
      break
    case type == DrawStrawsType.CREATE_GROUP_WITH_ROLE:
      const group = total / setup.reduce((pre, { limit }) => limit + pre, 0)
      setup.forEach(({ tag, limit }) => pool.push(...createGroup(group, `$${limit}$${tag}`)))
      break
    case type == DrawStrawsType.CREATE_GROUP:
      pool = createGroup(total / setup[0].limit, `$${setup[0].limit}`)
      break
  }

  pool.sort(() => Math.random() - 0.5)
  return { key: `${uuid}$${type}`, value: { title, pool } }
}

function createGroup(group: number, suffix: string): string[] {
  const res = []
  for (let i = 0; i < group; i++) res.push(i + suffix)

  return res
}
