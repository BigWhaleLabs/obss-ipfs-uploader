import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  DOMAIN: str({ default: undefined }),
  FILEBASE_API_TOKEN: str(),
  IPFS: str({ default: 'http://ipfs:5001/api/v0' }),
  IPFS_ID: str(),
  IPFS_IP_ADDRESS: str(),
  MONGO: str({ default: 'mongodb://mongo:27017/obss-ipfs-uploader' }),
  PORT: num({ default: 1337 }),
})
