import { create } from 'ipfs-http-client'
import env from '../helpers/env'

export default create({ url: env.IPFS })
