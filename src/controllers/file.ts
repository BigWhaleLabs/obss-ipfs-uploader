import * as fs from 'fs'
import { Body, Controller, File, Post } from 'amala'
import { fileTypeFromBuffer } from 'file-type'
import { setContentType } from '../helpers/contentTypes'
import backupCID from 'helpers/backupCID'
import ipfs from '../helpers/ipfs'

@Controller('/file')
export default class UploadController {
  @Post('/')
  async upload(@Body({ required: true }) file: unknown) {
    console.log('Uploading file', file)
    const { cid } = await ipfs.add(JSON.stringify(file))
    await ipfs.pin.add(cid)
    await backupCID(cid.toString())
    await setContentType(cid.toString(), 'application/json')
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
    await backupCID(cid.toString())

    const contentType = await fileTypeFromBuffer(fileContent)
    if (contentType) await setContentType(cid.toString(), contentType.mime)

    // Delete the temporary file
    fs.unlinkSync(file.path)

    return {
      cid: cid.toString(),
    }
  }
}
