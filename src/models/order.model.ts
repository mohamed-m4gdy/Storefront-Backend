import client from '../database'
import OrderType from '../types/order.types'

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
}
