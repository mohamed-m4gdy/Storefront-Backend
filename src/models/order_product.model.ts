import client from '../database'
import OrderProductTypes from '../types/order_products.types'

export default class OrderProduct {
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
