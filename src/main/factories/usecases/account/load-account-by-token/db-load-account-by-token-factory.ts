import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { LoadAccountByToken } from '../../../../../domain/usecases'
import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import env from '../../../../config/env'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
