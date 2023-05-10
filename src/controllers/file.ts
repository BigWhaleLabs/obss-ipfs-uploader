import * as fs from 'fs'
import { Body, Controller, File, Post } from 'amala'
import ipfs from '../helpers/ipfs'

@Controller('/file')
export default class UploadController {
  @Post('/')
  async upload(@Body({ required: true }) file: unknown) {
    console.log('Uploading file', file)
    const { cid } = await ipfs.add(JSON.stringify(file))
    await ipfs.pin.add(cid)
    return {
      cid: cid.toString(),
    }
  }

  @Post('/image')
  async image(@File() files: Record<string, File>) {
    const file = files.file as File & { path: string }

    if (!file || !file.path) {
      throw new Error('No file provided')
    }

    // Read the file content from the temporary path
    const fileContent = fs.readFileSync(file.path)
    // Add the file to IPFS
    const { cid } = await ipfs.add(fileContent)
    await ipfs.pin.add(cid)

    // Delete the temporary file
    fs.unlinkSync(file.path)

    return {
      cid: cid.toString(),
    }
  }
}
