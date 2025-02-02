import request from 'supertest'
import { Collection } from 'mongodb'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'John Doe',
          email: 'john@doe.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john@doe.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'john@doe.com',
          password: '123'
        })
        .expect(200)
    })

    test('should return 401 when credentials are invalid', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john@doe.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'john@doe.com',
          password: 'invalid_password'
        })
        .expect(401)
    })
  })
})
