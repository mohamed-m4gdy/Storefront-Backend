import { Request, Response } from 'express'
import Order from '../models/order.model'

const order = new Order()

export const createOrder = async (req: Request, res: Response) => {
  const bdy = req.body
  try {
    const orders = await order.createOrder(bdy)
    res.send(orders)
  } catch (e) {
    console.log(`Error While Creating Order ${e}`)
    res.status(500).send({ message: `An Error Occurred While Creating New Order ${e}` })
  }
}

export const getUserOpenOrder = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const openOrder = await order.getByUser(id)
    res.send(openOrder)
  } catch (e) {
    // eslint-disable-next-line quotes
    console.log("Error wile getting user's order")
    // eslint-disable-next-line quotes
    res.status(500).send({ message: "An Error occurred while getting user's order" })
  }
}

export const OrderProducts = async (req: Request, res: Response) => {
  try {
    const orders = await order.OrderProduct(req.body)
    res.send(orders)
  } catch (e) {
    console.log(`Error While Creating Order ${e}`)
  }
}
