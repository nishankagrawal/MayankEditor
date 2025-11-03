import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const uploadImage = async (
  file: File,
  folder?: string,
  transformation?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder: folder || 'uploads',
      resource_type: 'auto',
    }

    if (transformation) {
      uploadOptions.transformation = transformation
    }

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions)

    const stream = uploadStream.createWriteStream()
    stream.write(file.buffer)
    stream.end()

    stream.on('error', (error) => reject(error))
    stream.on('finish', (result) => resolve(result))
  })
}

export const uploadVideo = async (
  file: File,
  folder?: string,
  transformation?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder: folder || 'videos',
      resource_type: 'video',
      chunk_size: 6000000, // 6MB chunks
    }

    if (transformation) {
      uploadOptions.transformation = transformation
    }

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions)

    const stream = uploadStream.createWriteStream()
    stream.write(file.buffer)
    stream.end()

    stream.on('error', (error) => reject(error))
    stream.on('finish', (result) => resolve(result))
  })
}

export const generateImageUrl = (publicId: string, options?: {
  width?: number
  height?: number
  crop?: string
  quality?: number
  format?: string
}) => {
  let url = cloudinary.url(publicId, options)

  if (options) {
    const transformationParams = []

    if (options.width || options.height) {
      transformationParams.push(`${options.width || ''}x${options.height || ''}`)
    }

    if (options.crop) {
      transformationParams.push(`c_${options.crop}`)
    }

    if (options.quality) {
      transformationParams.push(`q_${options.quality}`)
    }

    if (options.format) {
      transformationParams.push(`f_${options.format}`)
    }

    if (transformationParams.length > 0) {
      url = cloudinary.url(publicId, {
        transformation: transformationParams.join('/')
      })
    }
  }

  return url
}

export const generateVideoUrl = (publicId: string, options?: {
  width?: number
  height?: number
  crop?: string
  quality?: number
  format?: string
}) => {
  let url = cloudinary.video_url(publicId, options)

  if (options) {
    const transformationParams = []

    if (options.width || options.height) {
      transformationParams.push(`${options.width || ''}x${options.height || ''}`)
    }

    if (options.crop) {
      transformationParams.push(`c_${options.crop}`)
    }

    if (options.quality) {
      transformationParams.push(`q_${options.quality}`)
    }

    if (options.format) {
      transformationParams.push(`f_${options.format}`)
    }

    if (transformationParams.length > 0) {
      url = cloudinary.video_url(publicId, {
        transformation: transformationParams.join('/')
      })
    }
  }

  return url
}

export const deleteResource = async (publicId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export const createImageTransformations = (
  publicId: string,
  transformations: Array<{
    width?: number
    height?: number
    crop?: string
    quality?: number
    format?: string
  }>
): string[] => {
  return transformations.map(transform => {
    let transformation = ''

    if (transform.width || transform.height) {
      transformation += `${transform.width || ''}x${transform.height || ''}`
    }

    if (transform.crop) {
      transformation += `c_${transform.crop}`
    }

    if (transform.quality) {
      transformation += `q_${transform.quality}`
    }

    if (transform.format) {
      transformation += `f_${transform.format}`
    }

    return cloudinary.url(publicId, {
      transformation: transformation
    })
  })
}

export const getPublicId = (url: string): string | null => {
  try {
    // Extract public ID from Cloudinary URL
    const regex = /\/upload\/(?:v\d+\/)?([^\/]+)\/[^\/]+$/
    const match = url.match(regex)
    return match ? match[1] : null
  } catch {
    return null
  }
}

export default {
  uploadImage,
  uploadVideo,
  generateImageUrl,
  generateVideoUrl,
  deleteResource,
  createImageTransformations,
  getPublicId
}