import { Router } from 'express'
import userRoutes from './api/users.api'

const routes = Router()

routes.use('/users', userRoutes)

export default routes
