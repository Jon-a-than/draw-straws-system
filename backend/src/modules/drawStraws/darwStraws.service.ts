import { Injectable } from '@nestjs/common'
import { DrawStrawsDBService } from '@/databases/drawStraws/drawStrawsDB.service'

import type { IDrawStrawsPool } from '@/interfaces/drawStraws.interface'

@Injectable()
export class DrawStrawsService {
  constructor(private readonly drawStrawsDBService: DrawStrawsDBService) {}

  async createDrawStrawsPool(drawStrawsPool: Omit<IDrawStrawsPool, '_id'>) {
    const uuid = await this.drawStrawsDBService.createDrawStrawsPool(drawStrawsPool)
    return { uuid }
  }
}
