import User from '../user.model'
import client from '../../database'
import UserType from '../../types/users.types'

const user = new User()

describe('User Model', () => {
  //Check if Methods Exists Or not
  describe('Test Methods Exists', () => {
    it('Should Have An Create Method', () => {
      expect(user.create).toBeDefined()
    })

    it('Should Have An show Method', () => {
      expect(user.show).toBeDefined()
    })

    it('Should Have An index Method', () => {
      expect(user.index).toBeDefined()
    })

    it('Should Have An login Method', () => {
      expect(user.login).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
    // Create User
    const userCreated = {
      firstname: 'test_firstname',
      lastname: 'test_lastname',
      email: 'user1@gmail.com',
      password: 'test_password',
    } as UserType

    // Add User To Database Before test
    beforeAll(async () => {
      const createdUser = await user.create(userCreated)
      userCreated.id = createdUser.id
    })

    // Delete User From Database After test
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM users'
      await connection.query(sql)
      connection.release()
    })

    // Test Create User
    it('Create User method should return a New User', async () => {
      const createdUser = await user.create({
        firstname: 'Test',
        lastname: 'User',
        email: 'user2@gmail.com',
        password: 'test123',
      } as UserType)
      expect(createdUser).toEqual({
        id: createdUser.id,
        firstname: 'Test',
        lastname: 'User',
        email: 'user2@gmail.com',
      } as UserType)
    })

    // Get All Users
    it('Get All Users Method Should Return All users', async () => {
      const users = await user.index()
      expect(users.length).toBe(2)
    })

    // Return One User with id
    it('Get One User method should return test User when called with ID', async () => {
      const returnedUser = await user.show('1')
      expect(returnedUser.id).toBe(1)
      expect(returnedUser.firstname).toBe(userCreated.firstname)
      expect(returnedUser.lastname).toBe(userCreated.lastname)
      expect(returnedUser.email).toBe(userCreated.email)
    })

    // Return One User With email
    it('Get One User method should return test User when called with Email', async () => {
      const returnedUser = await user.getByEmail('user1@gmail.com')
      expect(returnedUser.id).toBe(1)
      expect(returnedUser.firstname).toBe(userCreated.firstname)
      expect(returnedUser.lastname).toBe(userCreated.lastname)
      expect(returnedUser.email).toBe(userCreated.email)
    })
  })
})
