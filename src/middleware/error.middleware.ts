import { Request, Response, NextFunction } from 'express'
import Error from '../interface/error.interface'

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500
  const message = error.message || 'Ops! something wrong'
  res.status(status).json({ status, message })
}

export default errorMiddleware
