import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User Api Endpoint', () => {
  const user = {
    first_name: 'test',
    last_name: 'test2',
    password: 'test123',
  } as User

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
  })

  // Delete User From Database After test
  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users'
    await connection.query(sql)
    connection.release()
  })

  // Test Authentice Method if working and return Token
  describe('Test Authenticate Methods', () => {
    // In Case When Auth.. done
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({
          last_name: 'test2',
          password: 'test123',
        })
      expect(res.status).toBe(200)
      const { id, last_name, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(last_name).toBe('test2')
      token = userToken
    })
    // In Case When Auth.. failed
    it('should be failed to authenticate with wrong password', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          last_name: 'test2',
          password: 'test1234',
        })
      expect(res.status).toBe(404)
    })
  })

  // Test CRUD API WITH TOKEN
  describe('Should Test Crud Api Method', () => {
    //Create New User API
    it('Create New User', async () => {
      const res = await request.post('/api/users/register').send({
        first_name: 'Test2',
        last_name: 'User2',
        password: 'test123',
      } as User)
      expect(res.status).toBe(200)
      const { first_name, last_name } = res.body.data
      expect(first_name).toBe('Test2')
      expect(last_name).toBe('User2')
    })

    //Get All users
    it('Should Get All Users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    // Get One User Info
    it('Should Get One User Info', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.first_name).toBe('test')
      expect(res.body.data.last_name).toBe('test2')
    })

    //Update User
    it('should update user info', async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          first_name: 'first_name',
          last_name: 'last_name',
        })
      expect(res.status).toBe(200)

      const { id, first_name, last_name } = res.body.data
      expect(id).toBe(user.id)
      expect(first_name).toBe('first_name')
      expect(last_name).toBe('last_name')
    })

    // Delete User
    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(user.id)
      expect(res.body.data.last_name).toBe('last_name')
    })
  })
})
