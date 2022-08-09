import { Router } from 'express'
import userRoutes from './api/users.api'
import productRoutes from './api/product.api'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)

export default routes
