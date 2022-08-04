import supertest from 'supertest'

import app from '../index'

// Create a Request Object

const request = supertest(app)

describe('test basic endpoint server', () => {
  it('Get The / Endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
