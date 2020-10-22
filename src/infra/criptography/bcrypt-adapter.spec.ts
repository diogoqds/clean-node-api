import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = new BcryptAdapter(salt)
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
