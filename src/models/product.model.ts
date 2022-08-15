import db from '../database'
import Product from '../types/product.type'

class ProductModel {
  // Add Product
  async create(p: Product): Promise<Product> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category'
      // Run Query
      const result = await connection.query(sql, [p.name, p.price, p.category])
      // Release Connection
      connection.release()
      // Return [Product]
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Add Product (${(err as Error).message})`)
    }
  }
  // GET ALL Products
  async getAllProducts(): Promise<Product[]> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql = 'SELECT id, name, price, category FROM product'
      // Run Query
      const result = await connection.query(sql)
      // Release Connection
      connection.release()
      // Return Products
      return result.rows
    } catch (err) {
      throw new Error(`Unable To Get All Products (${(err as Error).message})`)
    }
  }
  // GET ONE Product
  async getOneProduct(id: string): Promise<Product> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql = 'SELECT id, name, price, category FROM product WHERE id = ($1)'
      // Run Query
      const result = await connection.query(sql, [id])
      // Release Connection
      connection.release()
      // Return Product
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Get Product (${(err as Error).message})`)
    }
  }
  // UPDATE Product
  async updateProduct(p: Product): Promise<Product> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'UPDATE product SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category'
      // Run Query
      const result = await connection.query(sql, [p.name, p.price, p.category, p.id])
      // Release Connection
      connection.release()
      // Return Product
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Update Product (${(err as Error).message})`)
    }
  }
  // DELETE Product
  async deleteProduct(id: string): Promise<Product> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'DELETE FROM product WHERE id = ($1) RETURNING id, name, price, category'
      // Run Query
      const result = await connection.query(sql, [id])
      // Release Connection
      connection.release()
      // Return Product
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Delete Product (${(err as Error).message})`)
    }
  }
}

export default ProductModel
