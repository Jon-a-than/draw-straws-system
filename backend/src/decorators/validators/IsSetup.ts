import { DrawStrawsType } from '@/interfaces/drawStraws.interface'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsSetup(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isSetup',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['total', 'type'],
      options: validationOptions ?? { message: 'Setup is not accepted' },
      validator: {
        validate(value: { tag: string; limit: number }[], args: ValidationArguments) {
          try {
            const sumOfSetup = value.reduce((total, { limit = NaN }) => limit + total, 0)
            const { type, total } = args.object as Record<string, number>

            switch (type) {
              case DrawStrawsType.DRAW_STRAWS:
                return total === sumOfSetup
              case DrawStrawsType.CREATE_GROUP:
                return value.length === 1 && total >= sumOfSetup
              case DrawStrawsType.CREATE_GROUP_WITH_ROLE:
                return value.length > 0 && total >= sumOfSetup
            }
          } catch {
            return false
          }
          return true
        }
      }
    })
  }
}
