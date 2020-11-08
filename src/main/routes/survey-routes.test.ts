import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'
import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(403)
    })

    test('should return 204 on add survey with valid accessToken', async () => {
      const password = await hash('123', 12)

      const res = await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john@doe.com',
        password,
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(204)
    })
  })
})
