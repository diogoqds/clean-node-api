import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type', (req: Request, res: Response) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req: Request, res: Response) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
