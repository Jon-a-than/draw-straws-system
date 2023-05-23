import type { ICreateDrawStrawsDto } from '../../src/interfaces/drawStraws.interface'

export async function createPool(payload: ICreateDrawStrawsDto): Promise<{ uuid: string }> {
  const res = await fetch(`http://localhost:4936/pool`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  return await res.json()
}
