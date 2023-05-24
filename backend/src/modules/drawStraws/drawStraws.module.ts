import { Module } from '@nestjs/common'
import { DrawStrawsService } from './darwStraws.service'
import { DrawStrawsController } from './drawStraws.controller'
import { DrawStrawsDBModule } from '@/databases/drawStraws/drawStrawsDB.module'
import { RedisLockModule } from '../redisLock/redisLock.module'

@Module({
  imports: [DrawStrawsDBModule, RedisLockModule],
  controllers: [DrawStrawsController],
  providers: [DrawStrawsService]
})
export class DrawStrawModule {}
