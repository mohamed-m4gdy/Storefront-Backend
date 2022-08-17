import { Request, Response } from 'express'
import User from '../models/user.model'

const user = new User()

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await user.index()
    res.send(users)
  } catch (e) {
    console.log('Error wile getting users')
    res.status(500).send({ message: 'An Error occurred while getting users' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const userWithID = await user.show(id)
    res.send(userWithID)
  } catch (e) {
    console.log('Error wile getting user')
    res.status(500).send({ message: 'An Error occurred while getting user' })
  }
}
