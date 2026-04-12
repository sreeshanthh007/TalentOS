
import type { 
  ApiResponse, 
  EmployerStats, 
  Job, 
  CreateJobPayload, 
  UpdateJobPayload, 
  Applicant, 
  UpdateApplicationStatusPayload, 
  EmployerSubscription, 
  EmployerUser, 
  UploadDocumentPayload, 
  EmployerDocument,
  Inquiry,
  Message,
  SendMessagePayload
} from '@/shared/types'

import { axiosInstance } from '@/shared/utils/axiosInstance'
import { getCloudinarySignatureApi, uploadToCloudinary } from '@/modules/auth/services/cloudinary.service'

const BASE_PATH = '/api/v1/employer'

// Stats
export async function getEmployerStatsApi(): Promise<ApiResponse<EmployerStats>> {
  const res = await axiosInstance.get(`${BASE_PATH}/stats`)
  return res.data
}

// Jobs
export async function getMyJobsApi(): Promise<ApiResponse<Job[]>> {
  const res = await axiosInstance.get(`${BASE_PATH}/jobs`)
  return res.data
}

export async function createJobApi(data: CreateJobPayload): Promise<ApiResponse<Job>> {
  const res = await axiosInstance.post(`${BASE_PATH}/jobs`, data)
  return res.data
}

export async function updateJobApi(id: string, data: UpdateJobPayload): Promise<ApiResponse<Job>> {
  const res = await axiosInstance.put(`${BASE_PATH}/jobs/${id}`, data)
  return res.data
}

export async function deleteJobApi(id: string): Promise<ApiResponse<null>> {
  const res = await axiosInstance.delete(`${BASE_PATH}/jobs/${id}`)
  return res.data
}

// Applicants
export async function getApplicantsByJobApi(jobId: string): Promise<ApiResponse<Applicant[]>> {
  const res = await axiosInstance.get(`${BASE_PATH}/jobs/${jobId}/applicants`)
  return res.data
}

export async function updateApplicationStatusApi(
  applicationId: string,
  data: UpdateApplicationStatusPayload
): Promise<ApiResponse<Applicant>> {
  const res = await axiosInstance.patch(`/api/v1/employer/applications/${applicationId}/status`, data)
  return res.data
}

// Subscription
export async function getMySubscriptionApi(): Promise<ApiResponse<EmployerSubscription>> {
  const res = await axiosInstance.get(`${BASE_PATH}/subscription`)
  return res.data
}

// Profile
export async function getEmployerProfileApi(): Promise<ApiResponse<EmployerUser>> {
  const res = await axiosInstance.get(`${BASE_PATH}/profile`)
  return res.data
}

export async function updateEmployerProfileApi(
  data: Partial<EmployerUser>
): Promise<ApiResponse<EmployerUser>> {
  const res = await axiosInstance.put(`${BASE_PATH}/profile`, data)
  return res.data
}

export async function uploadEmployerLogoApi(file: File): Promise<ApiResponse<EmployerUser>> {
  // 1. Get signature
  const sigRes = await getCloudinarySignatureApi('company-logos')
  
  // 2. Upload to Cloudinary
  const logoUrl = await uploadToCloudinary(file, sigRes.data)

  // 3. Update profile
  return await updateEmployerProfileApi({ company_logo_url: logoUrl })
}


// Verification documents
export async function uploadVerificationDocApi(
  data: UploadDocumentPayload
): Promise<ApiResponse<EmployerDocument>> {
  const res = await axiosInstance.post(`${BASE_PATH}/verification/documents`, data)
  return res.data
}

export async function getVerificationDocsApi(): Promise<ApiResponse<EmployerDocument[]>> {
  const res = await axiosInstance.get(`${BASE_PATH}/verification/documents`)
  return res.data
}

export async function submitVerificationApi(): Promise<ApiResponse<null>> {
  const res = await axiosInstance.post(`${BASE_PATH}/verification/submit`)
  return res.data
}

// Inquiries & Chat
export async function getMyInquiriesApi(): Promise<ApiResponse<Inquiry[]>> {
  const res = await axiosInstance.get(`${BASE_PATH}/inquiries`)
  return res.data
}

export async function getInquiryMessagesApi(
  inquiryId: string
): Promise<ApiResponse<Message[]>> {
  const res = await axiosInstance.get(`${BASE_PATH}/inquiries/${inquiryId}/messages`)
  return res.data
}

export async function sendEmployerMessageApi(
  data: SendMessagePayload
): Promise<ApiResponse<Message>> {
  const res = await axiosInstance.post(`${BASE_PATH}/messages`, data)
  return res.data
}

