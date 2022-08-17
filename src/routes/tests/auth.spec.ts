import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Auth Endpoints', () => {
  it('should register a user', async () => {
    const user = {
      firstname: 'New',
      lastname: 'User',
      email: 'email22@gmail.com',
      password: '123',
    }
    const res = await request
      .post('/register')
      .set('Content-Type', 'application/json')
      .send(user)
    expect(res.status).toBe(200)
  })
  it('should respond with 400 for wrong email or password ', async () => {
    const data = {
      email: 'randomemail@email.com',
      password: '123456',
    }
    const res = await request
      .post('/register')
      .set('Content-Type', 'application/json')
      .send(data)
    expect(res.status).toBe(400)
  })
})
