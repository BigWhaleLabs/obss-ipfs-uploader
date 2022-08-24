import * as request from 'supertest'
import * as shutdown from 'http-graceful-shutdown'
import { Server } from 'http'
import runApp from '@/helpers/runApp'

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
