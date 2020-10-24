import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test_body_parser', (req: Request, res: Response) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({
        name: 'John Doe'
      })
      .expect({ name: 'John Doe' })
  })
})
