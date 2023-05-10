import { Server } from 'http'
import request from 'supertest'
import runApp from '../helpers/runApp'
import shutdown from 'http-graceful-shutdown'

describe('File endpoint', () => {
  let server: Server

  beforeAll(async () => {
    server = await runApp()
  })

  afterAll(async () => {
    await shutdown(server)
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })

  it('should return cid for a valid request', async () => {
    const response = await request(server).post('/file').send({ test: 'test' })
    expect(response.body.cid).toBe('')
  })
})
