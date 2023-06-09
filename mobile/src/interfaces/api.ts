interface DrawStrawsPayload {
  uuid: string
  type: string
  name: string
  role: string
}

interface DrawStrawsResult {}

interface CreatePoolPayload {
  type: number
  total: number
  title: string
  setup: {
    tag: string
    limit: number
  }[]
}

interface CreatePoolResult {
  uuid: `${string}$${number}`
}

interface GetPoolListPayload {}

interface PoolListResult {}

export type {
  CreatePoolPayload,
  CreatePoolResult,
  DrawStrawsPayload,
  DrawStrawsResult,
  GetPoolListPayload,
  PoolListResult
}
