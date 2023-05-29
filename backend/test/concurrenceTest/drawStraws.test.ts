export async function testDrawStraws(UUID_POOL: string[], TOTAL: number, BASE_URL: string) {
  const requests = []
  let right = 0

  UUID_POOL.forEach((uuidWithType) => {
    const [uuid, type] = uuidWithType.split('$')

    const roles = []
    Array.from({ length: 20 }).forEach(() =>
      roles.push(...['Frontend', 'Backend', 'DevOps', 'Backend', 'DevOps'])
    )

    Array.from({ length: TOTAL }).forEach(async () => {
      requests.push(
        (async function () {
          const res = await fetch(`${BASE_URL}/pool`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uuid, type: +type, name: 'test', role: roles.pop() })
          })

          const { tag, title, name, role, uid, message } = await res.json()
          right += message ? 0 : 1
          console.log(
            message
              ? `\x1b[31m${message}\x1b[0m`
              : `title: \x1b[34m${title} uid: ${uid} ${tag} ${name} ${role}\x1b[0m`
          )
        })()
      )
    })
  })

  console.time('time')
  await Promise.allSettled(requests)
  console.timeEnd('time')
  console.log(`\x1b[32m${(right * 100) / requests.length}%\x1b[0m`)
}
