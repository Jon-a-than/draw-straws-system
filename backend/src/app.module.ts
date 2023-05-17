import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { MongooseModule } from '@nestjs/mongoose'

import { DrawStrawModule } from './modules/drawStraws/drawStraws.module'

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST ?? '127.0.0.1'}:27017`, {
      dbName: 'drawStrawsPool'
    }),
    DrawStrawModule
  ],
  controllers: [AppController]
})
export class AppModule {}
