import { Router } from 'express'
import { getAllUsers, getUser } from '../controllers/user.controller'
import {
  getUserOpenOrder,
  createOrder,
  OrderProducts,
} from '../controllers/order.controller'
import requiresAuth from '../middlewares/auth.middleware'

const user = Router()

user.get('/', requiresAuth, getAllUsers)
user.get('/:id', requiresAuth, getUser)
user.get('/:id/current-order', requiresAuth, getUserOpenOrder)
user.post('/', createOrder)
user.post('/:id/products', OrderProducts)

export default user
