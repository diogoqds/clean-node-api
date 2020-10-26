import { InvalidParamError, MissingParamError } from '../../errors'
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
    const { email, password } = httpRequest.body

    if (!email) {
      return Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!password) {
      return Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const isEmailValid = this.emailValidator.isValid(email)

    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return Promise.resolve({ statusCode: 200, body: undefined })
  }
}
