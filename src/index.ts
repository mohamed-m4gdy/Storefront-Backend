import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import Ratelimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
const port = 3000

// Create Instance server
const app: Application = express()

// Middleware to parse incoming requests
app.use(express.json())

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

// [ Get ] Add basic route
app.get('/', (req: Request, res: Response) => {
  throw new Error('test')
  res.json({ message: 'hello world' })
})
// [ Post ] post request
app.post('/', (req: Request, res: Response) => {
  console.log(req.body)
  res.json({ message: 'Hello World From Post Request', data: req.body })
})

// Handling Errors
app.use(errorMiddleware)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh you are lost, read the api documentation to find your way back home',
  })
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

export default app
