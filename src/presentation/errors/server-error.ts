export class ServerError extends Error {
  constructor (stack: string | undefined = undefined) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
