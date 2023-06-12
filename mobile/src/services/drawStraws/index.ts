import { alovaInstance } from '@/services/request'

import type {
  CreatePoolPayload,
  CreatePoolResult,
  DrawStrawsPayload,
  DrawStrawsResult,
  GetPoolListPayload,
  PoolListResult
} from '@/interfaces/api'

export function createPool(payload: CreatePoolPayload) {
  return alovaInstance.Post<CreatePoolResult>('/pool', payload)
}

export function drawStraws(payload: DrawStrawsPayload) {
  return alovaInstance.Put<DrawStrawsResult>('/pool', payload)
}

export function getPoolList(payload: GetPoolListPayload) {
  return alovaInstance.Get<PoolListResult>('/pool', {
    params: payload,
    localCache: { expire: 5000 }
  })
}
