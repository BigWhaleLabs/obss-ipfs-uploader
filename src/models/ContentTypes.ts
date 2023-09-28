import { getModelForClass, prop } from '@typegoose/typegoose'

class ContentTypes {
  @prop({ index: true, required: true })
  cid!: string
  @prop({ required: true })
  contentType!: string
}

export default getModelForClass(ContentTypes)
