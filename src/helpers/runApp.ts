import { Server } from 'http'
import { bootstrapControllers } from 'amala'
import IPFSController from '../controllers/ipfs'
import Koa from 'koa'
import Resize from '../controllers/resize'
import Router from 'koa-router'
import Upload from '../controllers/file'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import env from './env'

const app = new Koa()

export default async function () {
  const router = new Router()
  await bootstrapControllers({
    app,
    basePath: '/',
    controllers: [Upload, Resize, IPFSController],
    disableVersioning: true,
    router,
  })
  app.use(cors({ origin: '*' }))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return new Promise<Server>((resolve, reject) => {
    const connection = app
      .listen(env.PORT)
      .on('listening', () => {
        console.log(`HTTP is listening on ${env.PORT}`)
        resolve(connection)
      })
      .on('error', reject)
  })
}
