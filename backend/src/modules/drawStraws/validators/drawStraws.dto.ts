import { IsSetup } from '@/decorators/validators/IsSetup'
import { IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator'

import type { IDrawStrawsPool } from '@/interfaces/drawStraws.interface'

export class CreateDrawStrawsPoolDto implements Omit<IDrawStrawsPool, '_id'> {
  @IsNotEmpty()
  @Length(1, 50)
  title: string

  @IsInt()
  @Max(4)
  @Min(0)
  type: number

  @IsInt()
  @Max(200)
  @Min(1)
  total: number

  @IsSetup()
  setup: []
}
