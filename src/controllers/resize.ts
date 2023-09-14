import { Context } from 'koa'
import { Controller, Ctx, Get, Params, Query } from 'amala'
import { Readable } from 'stream'
import { getCachedResize, setCachedResize } from '../helpers/resizedImages'
import { getContentType } from '../helpers/contentTypes'
import ipfs, { getDataFromIPFS } from '../helpers/ipfs'
import sharp from 'sharp'

@Controller('/resize')
export default class ResizeController {
  @Get('/image/:cid')
  async image(
    @Ctx() ctx: Context,
    @Params('cid') cid: string,
    @Query('width') width: number,
    @Query('height') height: number
  ) {
    const contentType = await getContentType(cid)
    if (contentType) ctx.set('Content-Type', contentType)

    // If no width or height is provided, return the original image
    // If the image is a gif, return the original image
    if ((!width && !height) || (contentType && contentType.endsWith('gif')))
      return Readable.from(ipfs.cat(cid))

    // Check for cache hit; if found, return the cached image
    const cachedResizeCid = await getCachedResize(cid, height, width)
    if (cachedResizeCid) return Readable.from(ipfs.cat(cachedResizeCid))

    // If not, resize the image
    const original = await getDataFromIPFS(cid)
    const resizeOptions: sharp.ResizeOptions = {
      fit: 'cover',
      withoutEnlargement: true,
    }
    if (height) resizeOptions.height = height
    if (width) resizeOptions.width = width
    const resized = await sharp(original).resize(resizeOptions).toBuffer()

    // ...and cache the result
    const { cid: resizedCid } = await ipfs.add(resized)
    await ipfs.pin.add(resizedCid)
    await setCachedResize(cid, height, width, resizedCid.toString())

    return Readable.from(resized)
  }
}
