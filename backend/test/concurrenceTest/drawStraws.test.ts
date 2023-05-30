export async function testDrawStraws(
  UUID_POOL: string[],
  TOTAL: number,
  BASE_URL: string,
  POOL: number
) {
  const requests = []
  const rolesTmp = []

  for (let i = 0; i < 20; i++)
    rolesTmp.push(...['Frontend', 'Backend', 'DevOps', 'Backend', 'DevOps'])

  for (let i = 0; i < POOL; i++) {
    const uuidWithType = UUID_POOL[i]
    const [uuid, type] = uuidWithType.split('$')
    const roles = [...rolesTmp]

    for (let i = 0; i < TOTAL; i++) {
      requests.push(drawStraws(BASE_URL, uuid, type, roles))
    }
  }

  console.time('抽签用时')
  const settledRequests = await Promise.allSettled(requests)
  console.timeEnd('抽签用时')
  console.log(
    (settledRequests.filter(({ status }) => status === 'rejected') as PromiseRejectedResult[]).map(
      ({ reason }) => reason
    )
  )
  console.log(
    `共发起${settledRequests.length}次抽签请求, 请求成功数: ${settledRequests.reduce(
      (a, { status }) => a + +(status === 'fulfilled'),
      0
    )}`
  )
}

async function drawStraws(BASE_URL: string, uuid: string, type: string, roles: string[]) {
  const res = await fetch(`${BASE_URL}/pool`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid, type: +type, name: 'test', role: roles.pop() })
  }).catch((e) => {
    return Promise.reject(e)
  })

  const { tag, title, name, role, uid, message } = await res.json()
  console.log(
    message
      ? `\x1b[31m${message}\x1b[0m`
      : `title: \x1b[34m${title} uid: ${uid} ${tag} ${name} ${role}\x1b[0m`
  )
}
