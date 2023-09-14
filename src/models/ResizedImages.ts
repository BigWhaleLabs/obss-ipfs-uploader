import { getModelForClass, prop } from '@typegoose/typegoose'

class ResizedImages {
  @prop({ index: true, required: true })
  cid!: string
  @prop()
  height!: number | null
  @prop()
  width!: number | null
  @prop({ index: true, required: true })
  resizedCid!: string
}

export default getModelForClass(ResizedImages)
