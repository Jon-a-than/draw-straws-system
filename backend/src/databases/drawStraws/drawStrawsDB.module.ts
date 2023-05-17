import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DrawStrawsDBService } from './drawStrawsDB.service'
import { DrawStrawsPool, DrawStrawsPoolSchema } from '../schemas/drawStraws.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DrawStrawsPool.name, schema: DrawStrawsPoolSchema }])
  ],
  providers: [DrawStrawsDBService],
  exports: [DrawStrawsDBService]
})
export class DrawStrawsDBModule {}
