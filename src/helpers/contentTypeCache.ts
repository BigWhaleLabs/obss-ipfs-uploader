import { fileTypeFromBuffer } from 'file-type'
import { getDataFromIPFS } from '../helpers/ipfs'

const contentTypeCache = new Map<string, string>()

export async function getContentType(cid: string): Promise<string | undefined> {
  if (contentTypeCache.has(cid)) return contentTypeCache.get(cid)
  const buffer = await getDataFromIPFS(cid)
  const contentType = await fileTypeFromBuffer(buffer)
  if (!contentType) return undefined
  contentTypeCache.set(cid, contentType.mime)
  return contentType.mime
}

export function setContentType(cid: string, contentType: string) {
  contentTypeCache.set(cid, contentType)
}
