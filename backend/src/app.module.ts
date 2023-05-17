import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CacheModule } from '@nestjs/cache-manager'
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis'
import { DrawStrawModule } from './modules/drawStraws/drawStraws.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { dbName: 'drawStrawsPool' }),
    CacheModule.register({
      store: ioRedisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true
    }),
    DrawStrawModule
  ],
  controllers: [AppController]
})
export class AppModule {}
