import { IsSetup } from '@/decorators/validators/IsSetup'
import { IsInt, IsNotEmpty, IsUUID, Length, Max, Min } from 'class-validator'

import type { ICreateDrawStrawsDto } from '@/interfaces/drawStraws.interface'

export class CreateDrawStrawsPoolDto implements ICreateDrawStrawsDto {
  @IsNotEmpty()
  @Length(1, 50)
  title: string

  @IsNotEmpty()
  @IsInt()
  @Max(4)
  @Min(0)
  type: number

  @IsNotEmpty()
  @IsInt()
  @Max(200)
  @Min(1)
  total: number

  @IsSetup()
  setup: []
}

export class DrawStrawsDto {
  @IsNotEmpty()
  @IsUUID(4)
  uuid: string

  @IsNotEmpty()
  @Max(4)
  @Min(0)
  @IsInt()
  type: number

  @IsNotEmpty()
  @Length(1, 30)
  name: string

  @Length(1, 50)
  role: string
}

export class GetDrawStrawsListDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string
}
