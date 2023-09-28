import sharp from 'sharp'

export default async function resizeImage(
  originalImage: Parameters<typeof sharp>[0],
  height?: number,
  width?: number
): Promise<Buffer> {
  const resizeOptions: sharp.ResizeOptions = {
    fit: 'cover',
    withoutEnlargement: true,
  }
  if (height) resizeOptions.height = height
  if (width) resizeOptions.width = width
  const resized = await sharp(originalImage).resize(resizeOptions).toBuffer()
  return resized
}
