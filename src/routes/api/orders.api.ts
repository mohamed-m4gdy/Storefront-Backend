import { Router } from 'express'
import * as controllers from '../../controllers/order.controllers'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').post(validateTokenMiddleware, controllers.addOrders)
routes.route('/:id').get(validateTokenMiddleware, controllers.getOrder)

export default routes
