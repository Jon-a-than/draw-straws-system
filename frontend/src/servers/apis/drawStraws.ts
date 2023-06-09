import { alovaInstance } from '@/servers/instance'

import type { DrawStrawsPayload } from '@/interfaces/drawStraws'

export function createPool() {
  return alovaInstance.Post('pool', {})
}

export function drawStraws(drawStrawsPayload: DrawStrawsPayload) {
  return alovaInstance.Put<{ uuid: string }>('pool', drawStrawsPayload)
}

export function getDrawStrawsList() {
  return alovaInstance.Get('pool')
}
