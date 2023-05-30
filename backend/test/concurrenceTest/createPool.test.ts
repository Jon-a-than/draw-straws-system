import { POOL_CONFIG } from './conf/poolCoonfig'

import type { ICreateDrawStrawsDto } from '../../src/interfaces/drawStraws.interface'

export async function testCreatePool(POOL: number) {
  const UUID_POOL: string[] = []
  const works = Array.from({ length: POOL }).map(async () => {
    // const { uuid } = await createPool(POOL_CONFIG[0])
    const { uuid } = await createPool(POOL_CONFIG[~~(Math.random() * POOL_CONFIG.length)])
    UUID_POOL.push(uuid)
  })

  await Promise.allSettled(works)

  return UUID_POOL
}

export async function createPool(payload: ICreateDrawStrawsDto): Promise<{ uuid: string }> {
  const res = await fetch(`http://localhost:4936/pool`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  return await res.json()
}
