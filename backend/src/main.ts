import { AppModule } from '@/app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4936)
  new Logger('NestHostListen').log(`\x1B[34m${await app.getUrl()}`)
}
bootstrap()
