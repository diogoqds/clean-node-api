import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { EmailValidator } from '../protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | null {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isEmailValid) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
