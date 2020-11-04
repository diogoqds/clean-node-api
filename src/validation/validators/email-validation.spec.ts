import { EmailValidation } from './email-validation'
import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should an error if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const validation = sut.validate({ email: 'any_email@email.com' })
    expect(validation).toEqual(new InvalidParamError('email'))
  })

  test('should throw EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new InvalidParamError('email')
    })

    expect(sut.validate).toThrow()
  })

  test('should null if an valid email is provided', () => {
    const { sut } = makeSut()

    const validation = sut.validate({ email: 'any_email@email.com' })
    expect(validation).toEqual(null)
  })
})
