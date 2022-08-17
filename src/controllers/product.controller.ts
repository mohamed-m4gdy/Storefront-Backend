import { Request, Response } from 'express'
import Product from '../models/product.model'

const product = new Product()

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await product.index()
    res.send(products)
  } catch (e) {
    console.log('Error wile getting products')
    res.status(500).send({ message: 'An Error occurred while getting products' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const productWithID = await product.show(id)
    res.send(productWithID)
  } catch (e) {
    console.log('Error wile getting product')
    res.status(500).send({ message: 'An Error occurred while getting product' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category } = req.body
  const newProduct = { name, price, category }
  try {
    const createdProduct = await product.create(newProduct)
    res.send(createdProduct)
  } catch (e) {
    console.log('Error wile creating product')
    res.status(500).send({ message: 'An Error occurred while creating product' })
  }
}
