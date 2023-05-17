import { DrawStrawsService } from './darwStraws.service'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'

import { CreateDrawStrawsPoolDto } from './validators/drawStraws.dto'

@Controller('pool')
export class DrawStrawsController {
  constructor(private readonly drawStrawService: DrawStrawsService) {}

  @Post()
  async createDrawStrawsPool(@Body() body: CreateDrawStrawsPoolDto) {
    return await this.drawStrawService.createDrawStrawsPool(body)
  }

  @Put()
  async drawStraws() {
    return {}
  }

  @Get()
  async getDrawStrawsPoolList() {
    return {}
  }
}
