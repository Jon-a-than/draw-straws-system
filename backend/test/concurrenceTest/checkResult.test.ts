import { IDrawStrawsSchema } from '@/interfaces/drawStraws.interface'

export async function checkResult(UUID_POOL: string[], BASE_URL: string) {
  const requests = UUID_POOL.map(async (uuidWithType) => {
    const res = await fetch(BASE_URL + '/pool?uuid=' + uuidWithType.split('$')[0], {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    return await res.json()
  })

  const settledRequests = await Promise.allSettled(requests)

  const rightRate =
    settledRequests.reduce((right, request) => {
      if (request.status === 'fulfilled' && checkList(request.value)) {
        return right + 1
      }
      return right
    }, 0) / requests.length

  console.log('正确率：', rightRate * 100 + '%')
}

function checkList(drawStrawsResult: Omit<IDrawStrawsSchema, '_id'>) {
  const pool = {
    uid: ((1 + 100) * 100) / 2
  }
  switch (drawStrawsResult.type) {
    case 0:
      pool['一等奖'] = 10
      pool['二等奖'] = 20
      pool['三等奖'] = 30
      pool['参与奖'] = 40
      drawStrawsResult.list.forEach(({ uid, tag }) => {
        pool.uid -= uid
        pool[tag]--
      })
      return (
        pool.uid === 0 &&
        pool['一等奖'] === 0 &&
        pool['二等奖'] === 0 &&
        pool['三等奖'] === 0 &&
        pool['参与奖'] === 0
      )
    case 1:
    case 4:
      return drawStrawsResult.list.reduce((a, { uid }) => a + uid, 0) === pool.uid
    case 2:
      pool['0'] = 20
      pool['1'] = 20
      pool['2'] = 20
      pool['3'] = 20
      pool['4'] = 20
      drawStrawsResult.list.forEach(({ uid, tag }) => {
        pool[tag]--
        pool.uid -= uid
      })
      return (
        pool.uid === 0 &&
        pool['0'] === 0 &&
        pool['1'] === 0 &&
        pool['2'] === 0 &&
        pool['3'] === 0 &&
        pool['4'] === 0
      )
    case 3:
      pool['Frontend'] = 20
      pool['Backend'] = 40
      pool['DevOps'] = 40
      pool['group'] = new Array(20).fill(5)
      drawStrawsResult.list.forEach(({ uid, tag }) => {
        const [groupId, role] = tag.split('$')
        pool.uid -= uid
        pool['group'][+groupId]--
        pool[role]--
      })
      return (
        pool.uid === 0 &&
        pool['Frontend'] === 0 &&
        pool['Backend'] === 0 &&
        pool['DevOps'] === 0 &&
        pool['group'].every((i: number) => i === 0)
      )
  }
}
