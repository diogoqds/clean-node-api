import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const signSpy = jest.spyOn(jwt, 'sign')
    const secretKey = 'secret'
    const sut = new JwtAdapter(secretKey)
    const value = 'any_id'
    await sut.encrypt(value)
    expect(signSpy).toHaveBeenCalledWith({ id: value }, secretKey)
  })
})
