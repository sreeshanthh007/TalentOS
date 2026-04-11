import { axiosInstance } from '@/shared/utils/axiosInstance'
import { 
  type ApiResponse, 
  type CandidateUser, 
  type UpdateCandidateProfilePayload, 
  type Application,
  type ResumeBuilderInput,
  type ResumeBuilderOutput
} from '@/shared/types'

// Profile
export async function getCandidateProfileApi(): Promise<ApiResponse<CandidateUser>> {
  const response = await axiosInstance.get<ApiResponse<CandidateUser>>('/api/v1/candidate/profile')
  return response.data
}

export async function updateCandidateProfileApi(
  data: UpdateCandidateProfilePayload
): Promise<ApiResponse<CandidateUser>> {
  const response = await axiosInstance.put<ApiResponse<CandidateUser>>('/api/v1/candidate/profile', data)
  return response.data
}

export async function uploadAvatarApi(file: File): Promise<ApiResponse<{ avatar_url: string }>> {
  // 1. Get signature
  const sigRes = await axiosInstance.get<ApiResponse<{ timestamp: number; signature: string; folder: string; apiKey: string; cloudName: string }>>(
    '/api/v1/auth/cloudinary-signature?folder=avatars'
  )
  const { timestamp, signature, folder, apiKey, cloudName } = sigRes.data.data

  // 2. Upload to Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)
  formData.append('folder', folder)

  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  })
  const cloudData = await cloudRes.json()

  // 3. Update profile avatar
  const patchRes = await axiosInstance.patch<ApiResponse<{ avatar_url: string }>>('/api/v1/candidate/profile/avatar', {
    avatar_url: cloudData.secure_url
  })
  
  return patchRes.data
}

// Applications
export async function getMyApplicationsApi(): Promise<ApiResponse<Application[]>> {
  const response = await axiosInstance.get<ApiResponse<Application[]>>('/api/v1/candidate/applications')
  return response.data
}

export async function getMyShortlistedApi(): Promise<ApiResponse<Application[]>> {
  const response = await axiosInstance.get<ApiResponse<Application[]>>('/api/v1/candidate/shortlisted')
  return response.data
}

export async function applyForJobApi(
  jobId: string,
  resumeUrl: string
): Promise<ApiResponse<Application>> {
  const response = await axiosInstance.post<ApiResponse<Application>>('/api/v1/applications', {
    job_id: jobId,
    resume_url: resumeUrl
  })
  return response.data
}

// AI Resume Builder
export async function generateResumeContentApi(
  input: ResumeBuilderInput
): Promise<ApiResponse<ResumeBuilderOutput>> {
  const response = await axiosInstance.post<ApiResponse<ResumeBuilderOutput>>('/api/v1/candidate/resume/generate', input)
  return response.data
}
