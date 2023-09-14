import { fileTypeFromBuffer } from 'file-type'
import { getDataFromIPFS } from './ipfs'
import ContentTypesModel from '../models/ContentTypes'

export async function getContentType(cid: string): Promise<string | undefined> {
  const cachedContentType = await ContentTypesModel.findOne({ cid })
  if (cachedContentType) return cachedContentType.contentType

  const buffer = await getDataFromIPFS(cid)
  const fileType = await fileTypeFromBuffer(buffer)
  if (!fileType) return undefined

  await ContentTypesModel.create({ cid, contentType: fileType.mime })
  return fileType.mime
}

export async function setContentType(cid: string, contentType: string) {
  await ContentTypesModel.create({ cid, contentType: contentType })
}
