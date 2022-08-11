import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Error from '../interface/error.interface'
import config from '../utils/config'

const handleAuthError = (next: NextFunction) => {
  const error: Error = new Error('Login Error: Please Try Again')
  error.status = 401
  next(error)
}

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.tokenSecret as unknown as string)
        if (decode) {
          next()
        } else {
          handleAuthError(next)
        }
      } else {
        handleAuthError(next)
      }
    } else {
      handleAuthError(next)
    }
  } catch (error) {
    handleAuthError(next)
  }
}

export default validateTokenMiddleware
