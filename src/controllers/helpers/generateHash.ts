import bcrypt from 'bcrypt'
import config from '../../utils/config'

export default async function generateHash(password: string) {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}
