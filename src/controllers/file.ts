import { Body, Controller, Post } from 'amala'
import ipfs from '@/helpers/ipfs'

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
}
