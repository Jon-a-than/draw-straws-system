import { createPool } from './createPool.test'

const BASE_URL = 'http://localhost:4936'

async function cuncurrenceTest() {
  const UUID_POOL: string[] = []
  const works = Array.from({ length: 100 }).map(async (_, i) => {
    const { uuid } = await createPool({
      title: '不放回抽奖',
      total: 100,
      type: 0,
      setup: [
        { tag: '一等奖', limit: 10 },
        { tag: '二等奖', limit: 20 },
        { tag: '三等奖', limit: 30 },
        { tag: '参与奖', limit: 40 }
      ]
    })
    UUID_POOL.push(uuid)
    console.log(`奖池${i}: uuid: ${uuid}`)
  })

  await Promise.allSettled(works)

  console.log(UUID_POOL)

  const requests = []

  UUID_POOL.forEach((uuidWithType) => {
    const [uuid, type] = uuidWithType.split('$')

    Array.from({ length: 100 }).forEach(async () => {
      requests.push(
        (async function () {
          const res = await fetch(BASE_URL + '/pool', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uuid, type: +type, name: 'test', role: 'test' })
          })
          console.log(await res.json())
        })()
      )
    })
  })

  console.log(requests.length)
  console.time('time')
  await Promise.allSettled(requests)
  console.timeEnd('time')
}

cuncurrenceTest()
