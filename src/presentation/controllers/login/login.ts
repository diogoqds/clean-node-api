import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator
} from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!httpRequest.body.password) {
      return Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const { email } = httpRequest.body
    this.emailValidator.isValid(email)

    return Promise.resolve({ statusCode: 200, body: undefined })
  }
}
