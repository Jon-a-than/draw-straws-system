import { Cache } from 'cache-manager'
import { drawStraws } from './functions/drawStraws'
import { createPool } from './functions/createPool'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { DrawStrawsDBService } from '@/databases/drawStraws/drawStrawsDB.service'

import type { IDrawStrawsRedisValue } from './interfaces/drawStrawsRedis.interface'
import { DrawStrawsType, ICreateDrawStrawsDto } from '@/interfaces/drawStraws.interface'

@Injectable()
export class DrawStrawsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly drawStrawsDBService: DrawStrawsDBService
  ) {}

  /** @desc 创建奖池 */
  async createDrawStrawsPool(drawStrawsPool: ICreateDrawStrawsDto) {
    const { title, total, type } = drawStrawsPool
    const uuid = await this.drawStrawsDBService.createDrawStrawsPool({ type, title, total })

    const { key, value } = createPool({ ...drawStrawsPool, uuid })

    this.cacheManager.set(key, value, 0)
    return { uuid: `${uuid}$${type}` }
  }

  async drawStraws(uuid: string, type: DrawStrawsType, name: string, role?: string) {
    const key = `${uuid}$${type}`
    const drawStrawsPool = await this.cacheManager.get<IDrawStrawsRedisValue>(key)
    if (drawStrawsPool === undefined) return new HttpException('口令错误或奖池已关闭', 402)

    const { title, pool, uid } = drawStrawsPool
    const { tag, newPool, error } = drawStraws(pool, type, role)
    if (error !== undefined) return new HttpException(error, 402)

    await Promise.allSettled([
      this.drawStrawsDBService.addDrawStrawsListItem(
        { uid, name, tag: type == DrawStrawsType.CREATE_GROUP_WITH_ROLE ? `${tag}$${role}` : tag },
        uuid
      ),
      uid == 1
        ? this.cacheManager.del(key)
        : this.cacheManager.set(key, { title, pool: newPool, uid: uid - 1 }, 0)
    ])

    return {
      tag,
      title,
      name,
      role: type == DrawStrawsType.CREATE_GROUP_WITH_ROLE ? role : undefined,
      uid
    }
  }

  /** @desc 获取抽签结果列表 */
  async getDrawStrawsList(uuid: string) {
    return await this.drawStrawsDBService.findOneById(uuid)
  }
}
