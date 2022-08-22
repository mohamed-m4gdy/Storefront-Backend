import client from '../database'
import OrderType from '../types/order.types'
import OrderProductTypes from '../types/order_products.types'

export default class Order {
  async createOrder(o: OrderType): Promise<OrderType> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING status'
      const result = await conn.query(sql, [o.status, o.user_id])
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error Occurred While getting Oder: ${e}`)
    }
  }
  async getByUser(userId: string): Promise<OrderType[]> {
    try {
      const conn = await client.connect()
      // eslint-disable-next-line quotes
      const sql = "SELECT * from orders WHERE status='open' AND user_id=($1)"
      const result = await conn.query(sql, [userId])
      return result.rows
    } catch (e) {
      throw new Error(`An Error occurred while getting order: ${e}`)
    }
  }

  async OrderProduct(o: OrderProductTypes): Promise<OrderProductTypes> {
    try {
      const conn = await client.connect()
      // eslint-disable-next-line quotes
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING quantity'
      const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity])
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while getting order: ${e}`)
    }
  }
}
