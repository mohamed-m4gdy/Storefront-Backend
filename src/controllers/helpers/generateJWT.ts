import * as JWT from 'jsonwebtoken'
import UserType from '../../types/users.types'
import config from '../../utils/config'

export default function generateJWT(usertype: UserType) {
  return JWT.sign(usertype, config.tokenSecret as unknown as string)
}
