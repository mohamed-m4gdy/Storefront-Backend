import client from '../database'
import UserType from '../types/users.types'
import config from '../utils/config'
import bcrypt from 'bcrypt'

export default class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, firstname, lastname, email from users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (e) {
      throw new Error(`An Error occurred while getting users: ${e}`)
    }
  }
  async show(id: string): Promise<UserType> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, firstname, lastname, email from users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while getting user with id: ${id}: ${e}`)
    }
  }
  async getByEmail(email: string): Promise<UserType> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * from users WHERE email=($1)'
      const result = await conn.query(sql, [email])
      conn.release()
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while getting user with id: ${email}: ${e}`)
    }
  }

  async create(user: UserType): Promise<UserType> {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO users (firstname, lastname, password, email) 
      values ($1, $2, $3, $4) 
      RETURNING id, firstname, lastname, email`
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
        user.email,
      ])
      await conn.release()
      return result.rows[0]
    } catch (e) {
      throw new Error(`An Error occurred while creating user: ${e}`)
    }
  }

  async login(email: string, password: string): Promise<UserType | null> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT password FROM users WHERE email=$1'
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        )
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, firstname, lastname, email FROM users WHERE email=($1)',
            [email]
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
