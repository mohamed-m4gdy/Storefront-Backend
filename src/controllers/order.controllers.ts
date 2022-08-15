import { Request, Response, NextFunction } from 'express'
import OrdersModel from '../models/orders.model'

const ordersModel = new OrdersModel()

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as string
    const Order = await ordersModel.getOrder(id)
    res.json({
      data: Order,
    })
  } catch (err) {
    next(err)
  }
}
