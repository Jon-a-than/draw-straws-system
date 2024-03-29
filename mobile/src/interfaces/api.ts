interface DrawStrawsPayload {
  uuid: string
  type: number
  name: string
  role: string
}

interface DrawStrawsResult {
  title: string
  uid: number
  name: string
  tag: string
  role?: string
  message?: string
}

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
  message?: string
}

interface GetPoolListPayload {
  uuid: string
}

interface PoolListResult {
  error?: string
  title: string
  type: number
  total: number
  list: {
    uid: number
    name: string
    tag: string
  }[]
}

export type {
  CreatePoolPayload,
  CreatePoolResult,
  DrawStrawsPayload,
  DrawStrawsResult,
  GetPoolListPayload,
  PoolListResult
}
