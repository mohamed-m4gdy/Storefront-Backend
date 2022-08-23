import { Router } from 'express'
import { getUserOpenOrder, createOrder } from '../controllers/order.controller'
import { OrderProducts } from '../controllers/order_product.controller'
import requiresAuth from '../middlewares/auth.middleware'

const order = Router()

order.get('/:id/current-order', requiresAuth, getUserOpenOrder)
order.post('/', requiresAuth, createOrder)
order.post('/:id/products', requiresAuth, OrderProducts)

export default order
