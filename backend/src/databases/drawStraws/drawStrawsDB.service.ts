import { randomUUID } from 'node:crypto'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DrawStrawsPool } from '../schemas/drawStraws.schema'

import type { IDrawStrawsSchema, IUUID } from '@/interfaces/drawStraws.interface'

@Injectable()
export class DrawStrawsDBService {
  constructor(
    @InjectModel(DrawStrawsPool.name) private drawStrawsPoolModel: Model<DrawStrawsPool>
  ) {}

  async createDrawStrawsPool(
    drawStrawsInfo: Omit<IDrawStrawsSchema, '_id' | 'list'>
  ): Promise<IUUID> {
    const drawStrawsPool = { list: [], _id: randomUUID(), ...drawStrawsInfo }
    const newDrawStrawsPool = new this.drawStrawsPoolModel(drawStrawsPool)
    await newDrawStrawsPool.save()

    return drawStrawsPool._id
  }

  // async findPoolById(id: ): Promise<ListInfoDB | null> {
  //   const document = await this.todoModel.findById(id).lean().exec()
  // }
}
