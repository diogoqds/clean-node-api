import { HttpRequest, Validation } from '../../../protocols'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

describe('AddSurvey Controller', () => {
  test('should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }

    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()
    const sut = new AddSurveyController(validationStub)

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
