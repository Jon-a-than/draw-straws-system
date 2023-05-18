import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsSetup(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsSetup',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions ?? {
        message: 'setup is not matched typeof Setup'
      },
      validator: {
        validate(setups: unknown[]) {
          return !!setups?.reduce<boolean>((_, setup) => {
            const keys = Object.keys(setup)
            return keys.length === 2 && keys.includes('tag') && keys.includes('limit')
          }, true)
        }
      }
    })
  }
}
