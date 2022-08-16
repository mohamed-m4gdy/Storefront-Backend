import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import generateJWT from '../helpers/generateJWT'
import UserModel from '../models/user.model'
import config from '../utils/config'

const userModel = new UserModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    const token = generateJWT(user)
    res.json({
      message: 'User Created',
      data: { ...user, token },
    })
  } catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getAllUsers()
    res.json({
      message: 'All Users',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as string
    const user = await userModel.getOneUser(id)
    res.json({
      message: 'Your User',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { last_name, password } = req.body

    const user = await userModel.authenticate(last_name, password)

    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The Username Or Password Is Wrong Please Try Again',
      })
    }
    return res.json({
      data: { ...user, token },
    })
  } catch (err) {
    return next(err)
  }
}
