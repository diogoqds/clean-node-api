import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '../../../../data/protocols/db'
import { AccountModel } from '../../../../domain/models/'
import { AddAccountModel } from '../../../../domain/usecases/'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0]) as AccountModel
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && (MongoHelper.map(account) as AccountModel)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
