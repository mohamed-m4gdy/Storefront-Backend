import * as JWT from 'jsonwebtoken'
import User from '../types/user.type'
import config from '../utils/config'

export default function generateJWT(user: User) {
  return JWT.sign(user, config.tokenSecret as unknown as string)
}
