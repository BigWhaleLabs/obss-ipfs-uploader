import FormData from 'form-data'
import axios, { AxiosError } from 'axios'
import fs from 'fs'

const OLD_IPFS_NODE = `https://ipfs.sealcred.xyz`
const NEW_IPFS_UPLOADER = `https://ipfs-uploader.ketl.xyz`

async function main() {
  const new_node_pins = fs
    .readFileSync('./src/scripts/pins-new-node.txt', 'utf-8')
    .split('\n')
  const old_node_pins = fs
    .readFileSync('./src/scripts/pins-old-node.txt', 'utf-8')
    .split('\n')
  const new_node_pin_set = new Set(new_node_pins)
  const cids = old_node_pins.filter((pin) => !new_node_pin_set.has(pin))

  for (const cid of cids) {
    try {
      const downloadRes = await axios.get(
        `${OLD_IPFS_NODE}/ipfs/${cid.trim()}`,
        { timeout: 1000 }
      )
      if (downloadRes.headers['content-type'] === 'application/json') {
        const uploadRes = await axios.post(
          `${NEW_IPFS_UPLOADER}/file`,
          downloadRes.data
        )
        console.log(
          'Uploaded json ',
          uploadRes.data.cid,
          uploadRes.data.cid === cid
        )
      } else {
        const downloadStream = await axios.get(
          `${OLD_IPFS_NODE}/ipfs/${cid.trim()}`,
          { responseType: 'stream' }
        )

        const formData = new FormData()
        formData.append('file', downloadStream.data)

        const uploadRes = await axios.post(
          `${NEW_IPFS_UPLOADER}/file/image`,
          formData,
          { headers: formData.getHeaders() }
        )
        console.log(
          'Uploaded image ',
          uploadRes.data.cid,
          uploadRes.data.cid === cid
        )
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message)
      } else {
        console.log(e)
      }
    }
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
