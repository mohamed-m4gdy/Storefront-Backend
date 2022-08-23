import { Router } from 'express'
import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/product.controller'
import requiresAuth from '../middlewares/auth.middleware'
const product = Router()

product.get('/', getAllProducts)
product.get('/:id', getProduct)
product.post('/', requiresAuth, createProduct)

export default product
