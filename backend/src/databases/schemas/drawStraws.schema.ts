import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import type {
  DrawStrawsType,
  IDrawStrawsListItem,
  IDrawStrawsSchema
} from '@/interfaces/drawStraws.interface'

export type DrawStrawsPoolDocument = HydratedDocument<DrawStrawsPool>

@Schema()
export class DrawStrawsPool implements IDrawStrawsSchema {
  @Prop({ required: true })
  _id: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  type: DrawStrawsType

  @Prop({ required: true })
  total: number

  @Prop({ required: true })
  list: IDrawStrawsListItem[]
}

const DrawStrawsPoolSchema = SchemaFactory.createForClass(DrawStrawsPool)
export { DrawStrawsPoolSchema }
