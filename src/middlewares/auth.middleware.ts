import * as JWT from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from '../utils/config'

const requiresAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res
      .status(400)
      .send({ message: 'Unauthorized, Must send Authorization header.' })
  }
  const parts = authorization.split(' ')
  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Malformed Token' })
  }
  if (parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).send({ message: 'Malformed Token' })
  }
  const token = parts[1]
  try {
    console.log('token', token)
    const SECRET = config.tokenSecret as unknown as string
    const decoded = JWT.verify(token, SECRET)
    next()
  } catch (e) {
    return res.status(401).send({ message: 'Invalid Token' })
  }
}
export default requiresAuth
