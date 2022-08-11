import { Router } from 'express'
import * as controllers from '../../controllers/user.controllers'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').get(validateTokenMiddleware, controllers.getAllUsers)

routes.route('/register').post(controllers.create)

routes.route('/login').post(controllers.authenticate)

routes
  .route('/:id')
  .get(validateTokenMiddleware, controllers.getOneUser)
  .patch(validateTokenMiddleware, controllers.updateUser)
  .delete(validateTokenMiddleware, controllers.deleteUser)

export default routes
