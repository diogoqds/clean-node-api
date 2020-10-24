import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {
  test('should return an account on success', async () => {
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
