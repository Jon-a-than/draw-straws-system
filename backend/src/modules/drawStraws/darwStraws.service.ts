import { Cache } from 'cache-manager'
import { drawStraws } from './functions/drawStraws'
import { createPool } from './functions/createPool'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { DrawStrawsDBService } from '@/databases/drawStraws/drawStrawsDB.service'

import type { IDrawStrawsRedisValue } from './interfaces/drawStrawsRedis.interface'
import type { DrawStrawsType, ICreateDrawStrawsDto } from '@/interfaces/drawStraws.interface'

@Injectable()
export class DrawStrawsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly drawStrawsDBService: DrawStrawsDBService
  ) {}

  async createDrawStrawsPool(drawStrawsPool: ICreateDrawStrawsDto) {
    const { title, total, type } = drawStrawsPool
    const uuid = await this.drawStrawsDBService.createDrawStrawsPool({ type, title, total })

    const { key, value } = createPool({ ...drawStrawsPool, uuid })
    console.log(key, value)
    this.cacheManager.set(key, value, 0)
    return { uuid: `${uuid}$${type}` }
  }

  async drawStraws(uuid: string, type: DrawStrawsType, name: string, role?: string) {
    const key = `${uuid}$${type}`
    const drawStrawsPool = await this.cacheManager.get<IDrawStrawsRedisValue>(key)
    if (drawStrawsPool === undefined) return new HttpException('口令错误或奖池已关闭', 402)

    const { title, pool, uid } = drawStrawsPool
    const { tag, newPool, error } = drawStraws(pool, type, role)
    if (error) return new HttpException(error, 402)

    const asyncWorks: Promise<unknown>[] = []
    asyncWorks.push(
      uid == 1
        ? this.cacheManager.del(key)
        : this.cacheManager.set(key, { title, pool: newPool, uid: uid - 1 }, 0)
    )

    /** @TODO 更新数据库 */
    await Promise.allSettled(asyncWorks)

    return { tag, title, name, role, uid }
  }

  async getDrawStrawsList(uuid: string) {
    return await this.drawStrawsDBService.findOneById(uuid)
  }
}
