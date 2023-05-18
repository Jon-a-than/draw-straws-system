import { DrawStrawsService } from './darwStraws.service'
import { Body, Controller, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common'

import {
  CreateDrawStrawsPoolDto,
  DrawStrawsDto,
  GetDrawStrawsListDto
} from './validators/drawStraws.dto'

@Controller('pool')
export class DrawStrawsController {
  constructor(private readonly drawStrawService: DrawStrawsService) {}

  @Post()
  async createDrawStrawsPool(@Body() body: CreateDrawStrawsPoolDto) {
    return await this.drawStrawService.createDrawStrawsPool(body)
  }

  @Put()
  async drawStraws(@Body() { uuid, type, name, role }: DrawStrawsDto) {
    return await this.drawStrawService.drawStraws(uuid, type, name, role)
  }

  @Get()
  async getDrawStrawsPoolList(@Query(new ValidationPipe()) { uuid }: GetDrawStrawsListDto) {
    return await this.drawStrawService.getDrawStrawsList(uuid)
  }
}
