import { AccountModel } from '../../../domain/models'
import { LoadAccountByEmailRepository } from '../../protocols'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    const { email, password } = makeFakeAccount()

    await sut.auth({
      email,
      password
    })
    expect(loadSpy).toHaveBeenCalledWith(email)
  })
})
