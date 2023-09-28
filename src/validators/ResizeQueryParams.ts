import { IsNumberString, IsOptional } from 'amala'

export default class {
  @IsOptional()
  @IsNumberString()
  height!: string
  @IsOptional()
  @IsNumberString()
  width!: string
}
