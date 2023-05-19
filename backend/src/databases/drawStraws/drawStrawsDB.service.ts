import { randomUUID } from 'node:crypto'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DrawStrawsPool } from '../schemas/drawStraws.schema'

import type {
  IDrawStrawsListItem,
  IDrawStrawsSchema,
  IUUID
} from '@/interfaces/drawStraws.interface'

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

  async findOneById(uuid: string) {
    const document = (await this.drawStrawsPoolModel
      .findById(uuid)
      .lean()
      .exec()) as IDrawStrawsSchema & { __v: number }

    return document ? filterDocument(document) : null
  }

  async addDrawStrawsListItem(listItem: IDrawStrawsListItem, uuid: string) {
    const doc = await this.drawStrawsPoolModel.findOne({ _id: uuid })
    doc.list.push(listItem)
    await doc.save()
  }
}

function filterDocument<T extends Record<'_id' | '__v', unknown>>(
  document: T
): Omit<T, '_id' | '__v'> {
  const { _id, __v, ...filteredDocument } = document
  return filteredDocument
}
