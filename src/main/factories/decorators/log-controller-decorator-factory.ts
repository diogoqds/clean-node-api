import { LogControllerDecorator } from '../../decorators'
import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(controller, logMongoRepository)
}
