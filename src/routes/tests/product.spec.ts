import supertest from 'supertest'
import app from '../../server'
import client from '../../database'

const request = supertest(app)

describe('Product Endpoints', () => {
  // Create User
  let token: string
  beforeAll(async () => {
    try {
      const conn = await client.connect()
      const sql = 'TRUNCATE users RESTART IDENTITY CASCADE;'
      await conn.query(sql)
      const res = await request
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({
          firstname: 'New',
          lastname: 'User',
          email: 'email546@gmail.com',
          password: '123',
        })
      token = res.text
    } catch (e) {
      console.log('Error occurred while setting up database for Users routes tests')
    }
  })

  // Delete User From Database After test
  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE FROM users'
    await connection.query(sql)
    connection.release()
  })

  //Get All users
  it('Should Get All Products with auth header', async () => {
    const res = await request.get('/products/').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('should return 400 without auth header', async () => {
    const res = await request.post('/products/')
    expect(res.status).toBe(400)
  })
})
