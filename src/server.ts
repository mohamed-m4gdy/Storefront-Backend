import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import Ratelimit from 'express-rate-limit'
import product from './routes/product.route'
import user from './routes/user.route'
import auth from './routes/auth.route'
import config from './utils/config'

const port = config.port || 3000

// Create Instance server
const app: Application = express()

// Middleware to parse incoming requests
app.use(bodyParser.json())

// HTTP request logger middleware
app.use(morgan('common'))

// HTTP Secuity middleware
app.use(helmet())

// Apply the rate limiting middleware to all requests
app.use(
  Ratelimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many accounts created from this IP, please try again after an hour',
  })
)

app.use('/products', product)
app.use('/users', user)
app.use('/', auth)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

export default app
