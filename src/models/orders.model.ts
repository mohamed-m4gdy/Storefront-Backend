import db from '../database'
import Orders from '../types/orders.type'

class OrdersModel {
  async addOrders(o: Orders): Promise<Orders> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create Query
      const sql =
        'INSERT INTO orders(quantity, status, user_id, product_id) VALUES($1, $2, $3, $4) RETURNING quantity, status'
      // Run Query
      const result = await connection.query(sql, [
        o.quantity,
        o.status,
        o.user_id,
        o.product_id,
      ])
      // Release Connection
      connection.release()
      // Return [Order]
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could Not Add Order (${(err as Error).message})`)
    }
  }
  async getOrder(id: string): Promise<Orders[]> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'SELECT name, price, quantity, status FROM product JOIN orders ON product.id = orders.product_id WHERE orders.user_id = ($1)'
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
