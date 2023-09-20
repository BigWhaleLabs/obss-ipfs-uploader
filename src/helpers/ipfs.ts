import { IPFS_TIMEOUT } from '../constants'
import { create } from 'ipfs-http-client'
import env from '../helpers/env'

const ipfs = create({ url: env.IPFS })
export default ipfs

export async function getDataFromIPFS(cid: string): Promise<ArrayBuffer> {
  try {
    const chunks = []
    for await (const chunk of ipfs.cat(cid, { timeout: IPFS_TIMEOUT }))
      chunks.push(...chunk)
    if (chunks.length === 0) throw new Error("Couldn't get data from IPFS")
    const data = new Uint8Array(chunks.flat())
    const buffer = data.buffer
    return buffer
  } catch (e) {
    throw new Error("Couldn't get data from IPFS")
  }
}
