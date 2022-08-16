import { Request, Response, NextFunction } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      message: 'Product Added',
      data: { ...product },
    })
  } catch (err) {
    next(err)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getAllProducts()
    res.json({
      message: 'All Products',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as string
    const product = await productModel.getOneProduct(id)
    res.json({
      message: 'Your Product',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}
