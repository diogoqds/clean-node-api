import bcrypt from 'bcrypt'
import { Hasher, HashComparer } from '../../data/protocols/criptography'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)
    return isEqual
  }
}
