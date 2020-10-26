import { Authentication } from '../../../domain/usecases'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator
} from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      await this.authentication.auth(email, password)
      return Promise.resolve({ statusCode: 200, body: undefined })
    } catch (error) {
      return serverError(error)
    }
  }
}
