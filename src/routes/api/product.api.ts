import { Router } from 'express'
import * as controllers from '../../controllers/product.controllers'

const routes = Router()

routes.route('/').get(controllers.getAllProducts).post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getOneProduct)
  .patch(controllers.updateProduct)
  .delete(controllers.deleteProduct)

export default routes
