import { Controller, Get } from '@nestjs/common'
import { DrawStrawService } from './darwStraw.service'

@Controller()
export class DrawStrawController {
  constructor(private readonly drawStrawService: DrawStrawService) {}

  @Get()
  getHello(): string {
    return 'Hello World!'
  }
}
