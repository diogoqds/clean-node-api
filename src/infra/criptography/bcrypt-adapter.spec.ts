import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed_value')
  }
}))

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = makeSut(salt)
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.reject(new Error()))
    const salt = 12
    const sut = makeSut(salt)
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
