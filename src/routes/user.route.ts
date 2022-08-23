import { Router } from 'express'
import { getAllUsers, getUser } from '../controllers/user.controller'
import requiresAuth from '../middlewares/auth.middleware'

const user = Router()

user.get('/', requiresAuth, getAllUsers)
user.get('/:id', requiresAuth, getUser)

export default user
