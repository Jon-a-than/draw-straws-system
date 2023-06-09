/** @desc 奖池类型枚举 */
const enum DrawStrawsType {
  DRAW_STRAWS,
  DRAW_STRAWS_PUT_BACK,
  CREATE_GROUP,
  CREATE_GROUP_WITH_ROLE,
  SORT
}

interface CreateDrawStrawsPayload {
  title: string
  total: string
  setup: Array<{
    tag: string
    limit: string
  }>
}

interface DrawStrawsBasePayload {
  uuid: string
  name: string
}

type DrawStrawsPayload =
  | (DrawStrawsBasePayload & { type: 0 | 1 | 2 | 4 })
  | (DrawStrawsBasePayload & { type: 3; role: string })

export { DrawStrawsType }
export type { CreateDrawStrawsPayload, DrawStrawsPayload }
