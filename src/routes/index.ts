import { Router } from 'express'
import userRoutes from './api/users.api'
import productRoutes from './api/product.api'
import orderRoutes from './api/orders.api'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)

export default routes
