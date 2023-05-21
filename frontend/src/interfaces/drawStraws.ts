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

export { DrawStrawsType }
export type { CreateDrawStrawsPayload }
