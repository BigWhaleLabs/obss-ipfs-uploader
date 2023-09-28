import sharp from 'sharp'

const defaultResizeOptions: sharp.ResizeOptions = {
  fit: 'cover',
  withoutEnlargement: true,
}

export default async function resizeImage(
  originalImage: Parameters<typeof sharp>[0],
  height?: number,
  width?: number
): Promise<Buffer> {
  const resizeOptions = { ...defaultResizeOptions }
  if (height) resizeOptions.height = height
  if (width) resizeOptions.width = width
  const resized = await sharp(originalImage).resize(resizeOptions).toBuffer()
  return resized
}
