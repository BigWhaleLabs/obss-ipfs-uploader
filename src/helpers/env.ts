import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  DOMAIN: str({ default: undefined }),
  IPFS: str({ default: 'http://ipfs:5001/api/v0' }),
  PORT: num({ default: 1337 }),
})
