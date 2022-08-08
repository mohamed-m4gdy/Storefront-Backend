import bcrypt from 'bcrypt'
import db from '../database'
import User from '../types/user.type'
import config from '../utils/config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  // CREATE USER
  async create(u: User): Promise<User> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING first_name, last_name'
      // Run Query
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        hashPassword(u.password),
      ])
      // Release Connection
      connection.release()
      // Return Created User
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Create User (${(err as Error).message})`)
    }
  }
  // GET ALL USERS
  async getAllUsers(): Promise<User[]> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql = 'SELECT id, first_name, last_name FROM users'
      // Run Query
      const result = await connection.query(sql)
      // Release Connection
      connection.release()
      // Return users
      return result.rows
    } catch (err) {
      throw new Error(`Unable To Get All Users (${(err as Error).message})`)
    }
  }
  // GET ONE USER
  async getOneUser(id: string): Promise<User> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql = 'SELECT first_name, last_name FROM users WHERE id = ($1)'
      // Run Query
      const result = await connection.query(sql, [id])
      // Release Connection
      connection.release()
      // Return users
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Get All Users (${(err as Error).message})`)
    }
  }
  // UPDATE USER
  async updateUser(u: User): Promise<User> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql =
        'UPDATE users SET first_name=$1, last_name=$2, password=$3 WHERE id=$4 RETURNING id, first_name, last_name, password'
      // Run Query
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ])
      // Release Connection
      connection.release()
      // Return users
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Get All Users (${(err as Error).message})`)
    }
  }
  // DELETE USER
  async deleteUser(id: string): Promise<User> {
    try {
      // Open Connection With DB
      const connection = await db.connect()
      // Create query
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING id, first_name, last_name'
      // Run Query
      const result = await connection.query(sql, [id])
      // Release Connection
      connection.release()
      // Return users
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable To Get All Users (${(err as Error).message})`)
    }
  }
  // AUTHENTICATE USER
}

export default UserModel
