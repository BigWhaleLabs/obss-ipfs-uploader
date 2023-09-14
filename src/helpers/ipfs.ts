import { create } from 'ipfs-http-client'
import env from '../helpers/env'

const ipfs = create({ url: env.IPFS })
export default ipfs

export async function getDataFromIPFS(cid: string): Promise<ArrayBuffer> {
  const chunks = []
  for await (const chunk of ipfs.cat(cid)) chunks.push(...chunk)
  const data = new Uint8Array(chunks.flat())
  const buffer = data.buffer
  return buffer
}
