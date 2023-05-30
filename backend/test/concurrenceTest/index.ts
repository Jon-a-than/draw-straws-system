import { testCreatePool } from './createPool.test'
import { testDrawStraws } from './drawStraws.test'
import { checkResult } from './checkResult.test'

const BASE_URL = 'http://localhost:4936'
const POOL = 100
const TOTAL = 100

async function cuncurrenceTest() {
  const UUID_POOL = await testCreatePool(POOL)

  console.log(UUID_POOL)

  await testDrawStraws(UUID_POOL, TOTAL, BASE_URL, POOL)

  await checkResult(UUID_POOL, BASE_URL)
}

cuncurrenceTest()
