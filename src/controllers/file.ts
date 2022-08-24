import { Body, Controller, Post } from 'amala'

@Controller('/file')
export default class LoginController {
  @Post('/')
  upload(@Body({ required: true }) file: unknown) {
    // TODO: upload file to IPFS and return hash
    console.log('Uploading file', file)
    return {
      cid: '',
    }
  }
}
