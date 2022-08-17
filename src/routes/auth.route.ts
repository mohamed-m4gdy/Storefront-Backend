import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'

const auth = Router()

auth.post('/register', register)
auth.post('/login', login)

export default auth
