import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  //Check if Methods Exists Or not
  describe('Test Methods Exists', () => {
    it('Should Have An Create User Method', () => {
      expect(userModel.create).toBeDefined()
    })

    it('Should Have An Get One User Method', () => {
      expect(userModel.getOneUser).toBeDefined()
    })

    it('Should Have An Get All Users Method', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })

    it('Should Have An Update User Method', () => {
      expect(userModel.updateUser).toBeDefined()
    })

    it('Should Have An Delete User Method', () => {
      expect(userModel.deleteUser).toBeDefined()
    })
    it('Should Have An Authenticate Method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
    // Create User
    const user = {
      first_name: 'test_first_name',
      last_name: 'test_last_name',
      password: 'test_password',
    } as User

    // Add User To Database Before test
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

    // Test Create User
    it('Create User method should return a New User', async () => {
      const createdUser = await userModel.create({
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        first_name: 'Test',
        last_name: 'User',
      } as User)
    })

    // Get All Users
    it('Get All Users Method Should Return All users', async () => {
      const users = await userModel.getAllUsers()
      expect(users.length).toBe(2)
    })

    // Return One User
    it('Get One User method should return test User when called with ID', async () => {
      const returnedUser = await userModel.getOneUser(user.id as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
    })
  })
})
