import {
  AddAccountRepository,
  LoadAccountByEmailRepository
} from '../../../../data/protocols/db'
import { AccountModel } from '../../../../domain/models/'
import { AddAccountModel } from '../../../../domain/usecases/'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository
implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0]) as AccountModel
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return MongoHelper.map(account) as AccountModel
  }
}
