import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { IPFS_TIMEOUT } from '../constants'
import { Readable } from 'stream'
import { getContentType } from '../helpers/contentTypes'
import { internal, notFound } from '@hapi/boom'
import ResizeParams from '../validators/ResizeParams'
import ipfs from '../helpers/ipfs'

@Controller('/ipfs')
export default class IPFSController {
  @Get('/:cid')
  async getCID(@Ctx() ctx: Context, @Params() params: ResizeParams) {
    try {
      const { cid } = params
      const contentType = await getContentType(cid)
      if (contentType) ctx.set('Content-Type', contentType)
      return Readable.from(ipfs.cat(cid, { timeout: IPFS_TIMEOUT }))
    } catch (e: unknown) {
      console.error(e)
      if (e instanceof Error && e.message === "Couldn't get data from IPFS") {
        return ctx.throw(404, notFound())
      } else {
        return ctx.throw(500, internal())
      }
    }
  }
}
