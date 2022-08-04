import express, { Application, Request, Response } from 'express'
const port = 3000

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

export default app
