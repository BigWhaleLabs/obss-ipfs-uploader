import { CID } from 'multiformats/cid'
import { ValidationOptions, registerDecorator } from 'class-validator'

// Reference: https://github.com/typestack/class-validator#custom-validation-decorators
export default function isCID(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [property],
      name: 'isCID',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        validate(value) {
          try {
            CID.parse(value)
            return true
          } catch (e) {
            return false
          }
        },
      },
    })
  }
}
