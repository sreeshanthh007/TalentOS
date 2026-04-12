import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.routes'
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
  const response = await axiosInstance.get<ApiResponse<CandidateUser>>(API_ENDPOINTS.CANDIDATE.PROFILE)
  return response.data
}

export async function updateCandidateProfileApi(
  data: UpdateCandidateProfilePayload
): Promise<ApiResponse<CandidateUser>> {
  const response = await axiosInstance.put<ApiResponse<CandidateUser>>(API_ENDPOINTS.CANDIDATE.PROFILE, data)
  return response.data
}

export async function uploadAvatarApi(file: File): Promise<ApiResponse<{ avatar_url: string }>> {
  const sigRes = await axiosInstance.get<ApiResponse<{ timestamp: number; signature: string; folder: string; apiKey: string; cloudName: string }>>(
    `${API_ENDPOINTS.AUTH.CLOUDINARY_SIGNATURE}?folder=avatars`
  )
  const { timestamp, signature, folder, apiKey, cloudName } = sigRes.data.data

  // 2. Upload to Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)
  formData.append('folder', folder)

  const uploadUrl = `${import.meta.env.VITE_CLOUDINARY_UPLOAD_URL}/${cloudName}/image/upload`
  
  const cloudRes = await fetch(uploadUrl, {
    method: 'POST',
    body: formData
  })
  const cloudData = await cloudRes.json()

  // 3. Update profile avatar
  const patchRes = await axiosInstance.patch<ApiResponse<{ avatar_url: string }>>(API_ENDPOINTS.CANDIDATE.UPDATE_AVATAR, {
    avatar_url: cloudData.secure_url
  })
  
  return patchRes.data
}

// Applications
export async function getMyApplicationsApi(): Promise<ApiResponse<Application[]>> {
  const response = await axiosInstance.get<ApiResponse<Application[]>>(API_ENDPOINTS.CANDIDATE.APPLICATIONS)
  return response.data
}

export async function getMyShortlistedApi(): Promise<ApiResponse<Application[]>> {
  const response = await axiosInstance.get<ApiResponse<Application[]>>(API_ENDPOINTS.CANDIDATE.SHORTLISTED)
  return response.data
}

export async function applyForJobApi(
  jobId: string,
  resumeUrl: string
): Promise<ApiResponse<Application>> {
  const response = await axiosInstance.post<ApiResponse<Application>>(API_ENDPOINTS.APPLICATIONS.APPLY, {
    job_id: jobId,
    resume_url: resumeUrl
  })
  return response.data
}

// AI Resume Builder
export async function generateResumeContentApi(
  input: ResumeBuilderInput
): Promise<ApiResponse<ResumeBuilderOutput>> {
  const response = await axiosInstance.post<ApiResponse<ResumeBuilderOutput>>(API_ENDPOINTS.CANDIDATE.RESUME_GENERATE, input)
  return response.data
}

