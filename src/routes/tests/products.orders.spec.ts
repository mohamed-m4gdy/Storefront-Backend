import supertest from 'supertest'
import app from '../../server'
import client from '../../database'

const request = supertest(app)

describe('Product and Orders Endpoints', () => {
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
  describe('Products EndPoints', () => {
    it('Should Get All Products with auth header', async () => {
      const res = await request.get('/products/').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
    it('should return 400 without auth header', async () => {
      const res = await request.post('/products/')
      expect(res.status).toBe(400)
    })
  })

  describe('order Endpoints', () => {
    it('should return 400 without auth header current-order', async () => {
      const res = await request.get('/orders/1/current-order')
      expect(res.status).toBe(400)
    })
    it('should return 200 with auth header current-order', async () => {
      const res = await request
        .get('/orders/1/current-order')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
})
