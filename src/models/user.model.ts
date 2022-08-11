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
      const connection = await db.connect()
      const sql = `INSERT INTO users (first_name, last_name, password) 
                  values ($1, $2, $3) 
                  RETURNING id, first_name, last_name`
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        hashPassword(u.password as string),
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create User ${(error as Error).message}`)
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
      const sql = 'SELECT id, first_name, last_name FROM users WHERE id = ($1)'
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
      throw new Error(`Unable To Update User (${(err as Error).message})`)
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
      throw new Error(`Unable To Delete user (${(err as Error).message})`)
    }
  }
  // AUTHENTICATE USER
  async authenticate(last_name: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password FROM users WHERE last_name=$1'
      const result = await connection.query(sql, [last_name])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        )
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, first_name, last_name FROM users WHERE last_name=($1)',
            [last_name]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`)
    }
  }
}

export default UserModel
