import { axiosInstance } from '@/shared/utils/axiosInstance'
import { MESSAGES } from '@/shared/constants/messages.constants'
import { type ApiResponse } from '@/shared/types'

type CloudinarySignature = {
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

// Fetches signed credentials from backend
export async function getCloudinarySignatureApi(folder: string): Promise<CloudinarySignature> {
  const response = await axiosInstance.get<ApiResponse<CloudinarySignature>>(
    `/api/v1/auth/cloudinary-signature?folder=${folder}`
  )
  return response.data.data
}

// Uploads file directly to Cloudinary using signed credentials
// Returns secure_url
export async function uploadResumeToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  // 1. Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error(MESSAGES.UPLOAD.RESUME_TYPE_ERROR)
  }

  // 2. Validate file size (10MB = 10 * 1024 * 1024 bytes)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error(MESSAGES.UPLOAD.RESUME_SIZE_ERROR)
  }

  // 3. Get signature from backend
  const { timestamp, signature, folder, apiKey, cloudName } = await getCloudinarySignatureApi('resumes')

  // 4. Build FormData for Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)
  formData.append('folder', folder)

  // 5. Upload directly to Cloudinary using fetch with progress tracking
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
        reject(new Error(MESSAGES.UPLOAD.RESUME_ERROR))
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error(MESSAGES.UPLOAD.RESUME_ERROR))
    })

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`)
    xhr.send(formData)
  })
}
