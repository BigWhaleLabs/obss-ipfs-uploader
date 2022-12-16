import { CID } from 'ipfs-http-client'
import { IPFS } from 'ipfs-core-types/src/index'

export default async function (ipfs: IPFS, cid: CID) {
  const decoder = new TextDecoder()
  let content = ''

  for await (const chunk of ipfs.cat(cid)) {
    content += decoder.decode(chunk, {
      stream: true,
    })
  }

  return content
}
