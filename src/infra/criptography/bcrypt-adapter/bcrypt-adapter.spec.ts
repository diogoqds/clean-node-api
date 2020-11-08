import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed_value')
  },
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash', () => {
    test('should call hash with correct values', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      const salt = 12
      const sut = makeSut(salt)
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('should return a valid hash on hash success', async () => {
      const salt = 12
      const sut = makeSut(salt)
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hashed_value')
    })

    test('should throw if hash throws', async () => {
      jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.reject(new Error()))
      const salt = 12
      const sut = makeSut(salt)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare', () => {
    test('should call compare with correct values', async () => {
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      const salt = 12
      const sut = makeSut(salt)
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('should return true when compare succeeds', async () => {
      const salt = 12
      const sut = makeSut(salt)
      const isEqual = await sut.compare('any_value', 'any_hash')
      expect(isEqual).toBe(true)
    })

    test('should return false when compare fails', async () => {
      const salt = 12
      const sut = makeSut(salt)
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isEqual = await sut.compare('any_value', 'any_hash')
      expect(isEqual).toBe(false)
    })

    test('should throw if compare throws', async () => {
      jest.spyOn(bcrypt, 'compare').mockReturnValue(Promise.reject(new Error()))
      const salt = 12
      const sut = makeSut(salt)
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
