import isCID from './isCID'

export default class {
  @isCID('cid', { message: 'Invalid CID' })
  cid!: string
}
