import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import type { DrawStrawsType, IDrawStrawsPool, IPoolSetup } from '@/interfaces/drawStraws.interface'

export type DrawStrawsPoolDocument = HydratedDocument<DrawStrawsPool>

@Schema()
export class DrawStrawsPool implements IDrawStrawsPool {
  @Prop({ required: true })
  _id: string

  @Prop({ required: true })
  type: DrawStrawsType

  @Prop({ required: true })
  total: number

  @Prop({ required: true })
  setup: IPoolSetup[]
}

const DrawStrawsPoolSchema = SchemaFactory.createForClass(DrawStrawsPool)
export { DrawStrawsPoolSchema }
