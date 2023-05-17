import { Module } from '@nestjs/common'
import { DrawStrawService } from './darwStraw.service'
import { DrawStrawController } from './drawStraw.controller'

@Module({
  imports: [],
  controllers: [DrawStrawController],
  providers: [DrawStrawService]
})
export class DrawStrawModule {}
