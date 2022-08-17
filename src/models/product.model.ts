import client from '../database'
import ProductType from '../types/products.types'

export default class Product {
  async index(): Promise<ProductType[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * from products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (e) {
      throw new Error(`An Error occurred while getting products: ${e}`)
    }
  }

  async show(id: string): Promise<ProductType> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * from products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while getting product with id: ${id}: ${e}`)
    }
  }

  async create(product: ProductType): Promise<ProductType> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ])
      conn.release()
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while creating product: ${e}`)
    }
  }
}
