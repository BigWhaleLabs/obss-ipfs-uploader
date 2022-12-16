import { Body, Controller, Get, Params, Post } from 'amala'
import { CID } from 'ipfs-http-client'
import ipfs from '@/helpers/ipfs'
import readIpfsFile from '@/helpers/readIpfsFile'

@Controller('/file')
export default class LoginController {
  @Post('/')
  async upload(@Body({ required: true }) file: unknown) {
    console.log('Uploading file', file)
    const { cid } = await ipfs.add(JSON.stringify(file))
    await ipfs.pin.add(cid)
    return {
      cid: cid.toString(),
    }
  }

  @Get('/:cid')
  async getAccountByCid(@Params() { cid }: { cid: CID }) {
    try {
      const stringFile = await readIpfsFile(ipfs, cid)
      return JSON.parse(stringFile)
    } catch (error) {
      return { error }
    }
  }
}
