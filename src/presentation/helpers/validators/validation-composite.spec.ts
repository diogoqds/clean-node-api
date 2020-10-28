import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    const validationStub = new ValidationStub()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const sut = new ValidationComposite([validationStub])

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
