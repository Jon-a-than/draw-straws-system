import { randomUUID } from 'node:crypto'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DrawStrawsPool } from '../schemas/drawStraws.schema'
import { IDrawStrawsPool } from '@/interfaces/drawStraws.interface'

type UUID = `${string}-${string}-${string}-${string}-${string}`

@Injectable()
export class DrawStrawsDBService {
  constructor(
    @InjectModel(DrawStrawsPool.name) private drawStrawsPoolModel: Model<DrawStrawsPool>
  ) {}

  async createDrawStrawsPool(
    drawStrawsPool: Omit<IDrawStrawsPool, '_id'>
  ): Promise<`${UUID}$${number}`> {
    const _id = randomUUID()
    const newDrawStrawsPool = new this.drawStrawsPoolModel({ ...drawStrawsPool, _id })
    await newDrawStrawsPool.save()

    return `${_id}$${drawStrawsPool.type}`
  }

  // async findPoolById(id: ): Promise<ListInfoDB | null> {
  //   const document = await this.todoModel.findById(id).lean().exec()
  // }
}
