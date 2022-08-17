import bcrypt from 'bcrypt'
import config from '../../utils/config'

export default async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(`${password}${config.pepper}`, hash)
}
