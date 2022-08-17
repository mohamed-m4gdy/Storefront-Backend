import client from '../database'

export type OrderType = {
  id: number
  status: string
  user_id: number
}

export default class Order {
  async getByUser(userId: string): Promise<OrderType> {
    try {
      const conn = await client.connect()
      // eslint-disable-next-line quotes
      const sql = "SELECT * from orders WHERE status='open' AND user_id=($1)"
      const result = await conn.query(sql, [userId])
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while getting order: ${e}`)
    }
  }
}
