import jwt from 'jsonwebtoken'
import { Encrypter, Decrypter } from '../../../data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string | null> {
    await jwt.verify(value, this.secret)
    return null
  }
}
