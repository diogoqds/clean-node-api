import { Authentication, AuthenticationModel } from '../../../domain/usecases'
import {
  LoadAccountByEmailRepository,
  HashComparer,
  TokenGenerator
} from '../../protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    )

    if (account) {
      const validPassword = await this.hashComparer.compare(
        authentication.password,
        account.password
      )

      if (validPassword) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }

    return null
  }
}
