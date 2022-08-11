import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Module', () => {
  // Check If Auth Method Exists Or Not
  describe('Test Method Exists', () => {
    it('Should Have An Authenticate Method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })

  // Check if Authentication logic working or not
  describe('Test Authentication Logic', () => {
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

    //Check if auth working with Exists user and return info about user
    it('Authenticated Method Should Return User Info', async () => {
      const authUser = await userModel.authenticate(
        user.last_name,
        user.password as string
      )
      expect(authUser?.first_name).toBe(user.first_name)
      expect(authUser?.last_name).toBe(user.last_name)
    })

    //Check if auth working with wrong user and return null
    it('Authenticated Method Should Return null For Wrong User Info', async () => {
      const authUser = await userModel.authenticate('testWrong', 'passwordwrong')
      expect(authUser).toBe(null)
    })
  })
})
