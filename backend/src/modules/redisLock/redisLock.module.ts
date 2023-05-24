import { Module } from '@nestjs/common'
import { RedisLockService } from './redisLock.service'

@Module({
  providers: [RedisLockService],
  exports: [RedisLockService]
})
export class RedisLockModule {}
