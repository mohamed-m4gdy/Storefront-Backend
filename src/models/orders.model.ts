import db from '../database'
import Orders from '../types/orders.type'

class OrdersModel {
  async getOrder(id: string): Promise<Orders[]> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      // eslint-disable-next-line quotes
      const sql = "SELECT * from orders WHERE status='open' AND user_id=($1)"
      // Run Query
      const result = await connection.query(sql, [id])
      // Release Connection
      connection.release()
      // Return Product
      return result.rows
    } catch (err) {
      throw new Error(`Unable To Get Order (${(err as Error).message})`)
    }
  }
}
export default OrdersModel
