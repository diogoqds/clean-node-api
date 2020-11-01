import {
  ValidationComposite,
  EmailValidation,
  RequiredFieldValidation,
  CompareFieldsValidation
} from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { Validation } from '../../../presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation')
  )

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
