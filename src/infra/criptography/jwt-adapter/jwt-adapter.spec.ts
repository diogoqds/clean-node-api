import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const signSpy = jest.spyOn(jwt, 'sign')
    const secretKey = 'secret'
    const sut = new JwtAdapter(secretKey)
    const value = 'any_id'
    await sut.encrypt(value)
    expect(signSpy).toHaveBeenCalledWith({ id: value }, secretKey)
  })

  test('should return a token on sign success', async () => {
    const secretKey = 'secret'
    const sut = new JwtAdapter(secretKey)
    const value = 'any_id'
    const accessToken = await sut.encrypt(value)
    expect(accessToken).toBe('any_token')
  })
})
