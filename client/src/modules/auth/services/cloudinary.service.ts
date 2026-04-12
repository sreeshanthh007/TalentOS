import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.routes'
import { type ApiResponse } from '@/shared/types'

export type CloudinarySignature = {
  timestamp: number
  signature: string
  folder: string
  apiKey: string
  cloudName: string
}

type CloudinaryUploadResponse = {
  secure_url: string
  public_id: string
  format: string
  bytes: number
}


export async function getCloudinarySignatureApi(folder: string): Promise<ApiResponse<CloudinarySignature>> {
  const response = await axiosInstance.get<ApiResponse<CloudinarySignature>>(
    `${API_ENDPOINTS.AUTH.CLOUDINARY_SIGNATURE}?folder=${folder}`
  )
  return response.data
}


export async function uploadToCloudinary(
  file: File,
  signatureData: CloudinarySignature,
  onProgress?: (percent: number) => void
): Promise<string> {
  const { timestamp, signature, folder, apiKey, cloudName } = signatureData

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)
  formData.append('folder', folder)

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText) as CloudinaryUploadResponse
        resolve(response.secure_url)
      } else {
        reject(new Error('Cloudinary upload failed'))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Cloudinary upload network error')))
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`)
    xhr.send(formData)
  })
}

/**
 * Maintained for backward compatibility if needed, but discouraged in favor of the generic uploader
 */
export async function uploadResumeToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const res = await getCloudinarySignatureApi('resumes')
  return uploadToCloudinary(file, res.data, onProgress)
}
