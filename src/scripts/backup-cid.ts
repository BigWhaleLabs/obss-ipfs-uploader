import backupCID from '../helpers/backupCID'
import fs from 'fs'

async function main() {
  const cids = await fs
    .readFileSync('./src/scripts/pins-new-node.txt', 'utf-8')
    .split('\n')
  for (const cid of cids) await backupCID(cid.trim())
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
