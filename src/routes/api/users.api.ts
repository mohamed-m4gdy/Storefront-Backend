import { Router } from 'express'
import * as controllers from '../../controllers/user.controllers'

const routes = Router()

routes.route('/').get(controllers.getAllUsers).post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getOneUser)
  .patch(controllers.updateUser)
  .delete(controllers.deleteUser)

routes.route('/authenticate').post(controllers.authenticate)

export default routes
