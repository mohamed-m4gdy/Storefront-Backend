import { Router } from 'express'
import { getAllUsers, getUser } from '../controllers/user.controller'
import { getUserOpenOrder } from '../controllers/order.controller'
import requiresAuth from '../middlewares/auth.middleware'

const user = Router()

user.get('/', requiresAuth, getAllUsers)
user.get('/:id', requiresAuth, getUser)
user.get('/:id/current-order', requiresAuth, getUserOpenOrder)

export default user