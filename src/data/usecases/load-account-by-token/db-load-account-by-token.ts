import { AccountModel } from '../../../domain/models'
import { LoadAccountByToken } from '../../../domain/usecases'
import { Decrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (
    accessToken: string,
    role?: string
  ): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
