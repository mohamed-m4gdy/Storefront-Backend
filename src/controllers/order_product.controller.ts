import { Request, Response } from 'express'
import OrderProduct from '../models/order_product.model'

const order = new OrderProduct()

export const OrderProducts = async (req: Request, res: Response) => {
  try {
    const orders = await order.OrderProduct(req.body)
    res.send(orders)
  } catch (e) {
    console.log(`Error While Creating Order ${e}`)
  }
}
