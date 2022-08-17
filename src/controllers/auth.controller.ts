import { Request, Response } from 'express'
import User from '../models/user.model'
import generateHash from './helpers/generateHash'
import generateJWT from './helpers/generateJWT'
import config from '../utils/config'
import jwt from 'jsonwebtoken'

const user = new User()

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({
      message: 'firstname, lastname, email, and password are required',
    })
  }
  try {
    const checkUser = await user.getByEmail(email)
    if (checkUser) {
      return res.status(400).send({ message: 'User already exists' })
    }
  } catch (e) {
    console.log('Error wile validating user')
    res.status(500).send({ message: 'An Error occurred while validating user' })
  }

  try {
    const hashedPassword = await generateHash(password)
    const newUser = { firstname, lastname, email, password: hashedPassword }
    const createdUser = await user.create(newUser)
    delete createdUser['password']
    const token = generateJWT(createdUser)
    res.send(token)
  } catch (e) {
    console.log('Error wile registering user')
    res.status(500).send({ message: 'An Error occurred while registering user' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const createdUser = await user.login(email, password)

    const token = jwt.sign({ createdUser }, config.tokenSecret as unknown as string)

    if (!createdUser) {
      return res.status(404).json({
        status: 'error',
        message: 'The Username Or Password Is Wrong Please Try Again',
      })
    }
    return res.send(token)
  } catch (err) {
    console.log(err)
  }
}
