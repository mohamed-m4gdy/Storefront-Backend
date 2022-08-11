import { Request, Response, NextFunction } from 'express'
import OrdersModel from '../models/orders.model'

const ordersModel = new OrdersModel()

export const addOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Order = await ordersModel.addOrders(req.body)
    res.json({
      message: 'Order Added',
      data: { ...Order },
    })
  } catch (err) {
    next(err)
  }
}

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
