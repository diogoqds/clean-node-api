import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  },
  async verify (): Promise<string> {
    return Promise.resolve('any_value')
  }
}))

interface SutTypes {
  sut: JwtAdapter
  secretKey: string
}
const makeSut = (): SutTypes => {
  const secretKey = 'secret'
  const sut = new JwtAdapter(secretKey)
  return {
    sut,
    secretKey
  }
}

const makeValue = (): string => {
  return 'any_value'
}

describe('Jwt Adapter', () => {
  describe('encrypt', () => {
    test('should call sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      const { sut, secretKey } = makeSut()
      const value = makeValue()
      await sut.encrypt(value)
      expect(signSpy).toHaveBeenCalledWith({ id: value }, secretKey)
    })

    test('should return a token on sign success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt(makeValue())
      expect(accessToken).toBe('any_token')
    })

    test('should throw if sign throws', async () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const { sut } = makeSut()
      const promise = sut.encrypt(makeValue())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt', () => {
    test('should call verify with correct values', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      const { sut, secretKey } = makeSut()
      const value = makeValue()
      await sut.decrypt(value)
      expect(verifySpy).toHaveBeenCalledWith(value, secretKey)
    })
  })
})
