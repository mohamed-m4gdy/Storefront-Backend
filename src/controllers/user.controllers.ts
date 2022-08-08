import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'

const userModel = new UserModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      message: 'User Created',
      data: { ...user },
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateUser(req.body)
    res.json({
      message: 'User Updated',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as string
    const user = await userModel.deleteUser(id)
    res.json({
      message: 'User Deleted',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}
