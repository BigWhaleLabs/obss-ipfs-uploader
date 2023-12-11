import axios from 'axios'
import backupCID from '../helpers/backupCID'
import env from '../helpers/env'
import fs from 'fs'

interface GetPinsResult {
  pin: {
    name: string
    cid: string
  }
}

interface GetPinsResponse {
  count: number
  results: GetPinsResult[]
}

async function main() {
  const res = await axios.get<GetPinsResponse>(
    'https://api.filebase.io/v1/ipfs/pins?limit=30000',
    { headers: { Authorization: `Bearer ${env.FILEBASE_API_TOKEN}` } }
  )
  const backedUpPins = res.data.results.map(({ pin }) => pin.cid)
  const backupUpPinSet = new Set(backedUpPins)
  const cids = await fs
    .readFileSync('./src/scripts/pins-new-node.txt', 'utf-8')
    .split('\n')
  for (const cid of cids) {
    if (!backupUpPinSet.has(cid)) await backupCID(cid.trim())
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
