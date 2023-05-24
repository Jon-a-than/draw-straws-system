import { Cache } from 'cache-manager'
import IoRedis, { type Redis } from 'ioredis'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RedisLockService {
  redis: Redis
  Logger = new Logger('RedisLockModule')

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redis = new IoRedis({ port: 6379, host: process.env.REDIS_HOST ?? '127.0.0.1' })
    this.redis.on('error', (err) => this.Logger.error('Redis cluster Error: ' + err))
    this.redis.on('connect', () => this.Logger.log('\x1B[34mRedis linked successfully\x1B[0m'))
  }

  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
  }

  async lock(key: string): Promise<boolean> {
    for (let reTryCount = 0; reTryCount < 600; reTryCount++) {
      const res = await this.redis.setnx(key, 1)
      await this.sleep(10)
      if (res) return true
    }
    this.Logger.error('System Timeout')
    return false
  }

  unlock(key: string) {
    this.redis.del(key)
  }
}
