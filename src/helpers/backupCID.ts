import axios, { AxiosError } from 'axios'
import env from './env'

const IPFS_PINNING_URL = 'https://api.filebase.io/v1/ipfs/pins'

export default async function backupCID(cid: string) {
  try {
    await axios.post(
      IPFS_PINNING_URL,
      {
        cid,
        name: cid,
        origins: [
          `/ip4/${env.IPFS_IP_ADDRESS}/tcp/4001/p2p/${env.IPFS_ID}`,
          `/ip4/${env.IPFS_IP_ADDRESS}/udp/4001/quic/p2p/${env.IPFS_ID}`,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${env.FILEBASE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.message)
  }
}
