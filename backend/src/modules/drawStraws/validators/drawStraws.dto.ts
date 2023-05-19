import { IsSetup } from '@/decorators/validators/IsSetup'
import {
  IsInt,
  IsNotEmpty,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested
} from 'class-validator'

import { DrawStrawsType, ICreateDrawStrawsDto, IPoolSetup } from '@/interfaces/drawStraws.interface'

class PoolSetup implements IPoolSetup {
  tag: string

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  limit: number
}

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

  @ValidateNested({ each: true })
  @ValidateIf(({ type }) => type !== DrawStrawsType.SORT)
  @IsSetup()
  setup: PoolSetup[]
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
  @IsUUID(4)
  uuid: string
}
