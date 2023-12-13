import { Context } from 'koa'
import { Controller, Ctx, Get, Params, Query } from 'amala'
import { IPFS_TIMEOUT } from '../constants'
import { Readable } from 'stream'
import { badRequest, internal, notFound } from '@hapi/boom'
import { getCachedResize, setCachedResize } from '../helpers/resizedImageCache'
import { getContentType } from '../helpers/contentTypes'
import ResizeParams from '../validators/ResizeParams'
import ResizeQueryParams from '../validators/ResizeQueryParams'
import backupCID from '../helpers/backupCID'
import ipfs, { getDataFromIPFS } from '../helpers/ipfs'
import resizeImage from '../helpers/resizeImage'

@Controller('/resize')
export default class ResizeController {
  @Get('/image/:cid')
  async image(
    @Ctx() ctx: Context,
    @Params() params: ResizeParams,
    @Query() query: ResizeQueryParams
  ) {
    try {
      const { cid } = params
      const height = Math.round(Number(query.height))
      const width = Math.round(Number(query.width))

      const contentType = await getContentType(cid)
      if (contentType && !contentType.startsWith('image/'))
        return ctx.throw(400, badRequest('Not an image'))

      if (contentType) ctx.set('Content-Type', contentType)

      // If no width or height is provided, return the original image
      // If the image is a gif, return the original image
      if ((!width && !height) || (contentType && contentType.endsWith('gif')))
        return Readable.from(ipfs.cat(cid, { timeout: IPFS_TIMEOUT }))

      // Check for cache hit; if found, return the cached image
      const cachedResizeCid = await getCachedResize(cid, height, width)
      if (cachedResizeCid)
        return Readable.from(
          ipfs.cat(cachedResizeCid, { timeout: IPFS_TIMEOUT })
        )

      // If not, resize the image
      const original = await getDataFromIPFS(cid)
      const resized = await resizeImage(original, height, width)

      // ...and cache the result
      const { cid: resizedCid } = await ipfs.add(resized)
      await ipfs.pin.add(resizedCid)
      void backupCID(resizedCid.toString())
      await setCachedResize(cid, height, width, resizedCid.toString())

      return Readable.from(resized)
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
