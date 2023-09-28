import ResizedImages from '../models/ResizedImages'

export async function getCachedResize(
  cid: string,
  height?: number,
  width?: number
): Promise<string | null> {
  const resizedImage = await ResizedImages.findOne({
    cid,
    height: height ? height : null,
    width: width ? width : null,
  })
  if (!resizedImage) return null
  return resizedImage.resizedCid
}

export async function setCachedResize(
  cid: string,
  height: number | undefined,
  width: number | undefined,
  resizedCid: string
) {
  await ResizedImages.create({
    cid,
    height: height ? height : null,
    resizedCid,
    width: width ? width : null,
  })
}
