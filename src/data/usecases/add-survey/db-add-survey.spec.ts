import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository, AddSurveyModel } from './db-add-survey-protocols'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
})

describe('DbAddSurvey Usecase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return Promise.resolve()
      }
    }

    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const surveyData = makeFakeSurveyData()

    const sut = new DbAddSurvey(addSurveyRepositoryStub)

    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
