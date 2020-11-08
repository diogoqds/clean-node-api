import { AccountModel } from '../../../../domain/models'

export interface LoadAccountByTokenRepository {
  loadByToken: (
    accessToken: string,
    role?: string
  ) => Promise<AccountModel | null>
}
