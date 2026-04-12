import { axiosInstance } from '@/shared/utils/axiosInstance'
import type { 
  ApiResponse, 
  AdminStats, 
  AdminEmployer, 
  AdminCandidate, 
  SubscriptionPlan, 
  UpdatePlanPayload,
  Inquiry,
  Message,
  SendMessagePayload
} from '@/shared/types'

const BASE = '/api/v1/admin'

// Stats
export async function getAdminStatsApi(): Promise<ApiResponse<AdminStats>> {
  const response = await axiosInstance.get<ApiResponse<AdminStats>>(`${BASE}/stats`)
  return response.data
}

// Employers
export async function getEmployersApi(params?: {
  search?: string
  verification_status?: string
  page?: number
}): Promise<ApiResponse<{ data: AdminEmployer[]; total: number }>> {
  const response = await axiosInstance.get<ApiResponse<{ data: AdminEmployer[]; total: number }>>(
    `${BASE}/employers`,
    { params }
  )
  return response.data
}

export async function getEmployerDetailApi(
  employerId: string
): Promise<ApiResponse<AdminEmployer>> {
  const response = await axiosInstance.get<ApiResponse<AdminEmployer>>(`${BASE}/employers/${employerId}`)
  return response.data
}

export async function blockEmployerApi(
  userId: string
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.patch<ApiResponse<null>>(`${BASE}/users/${userId}/block`, { is_blocked: true })
  return response.data
}

export async function unblockEmployerApi(
  userId: string
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.patch<ApiResponse<null>>(`${BASE}/users/${userId}/block`, { is_blocked: false })
  return response.data
}

export async function deleteEmployerApi(
  employerId: string
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE}/employers/${employerId}`)
  return response.data
}

export async function updateVerificationStatusApi(
  employerId: string,
  status: 'approved' | 'rejected'
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.patch<ApiResponse<null>>(`${BASE}/employers/${employerId}/verification`, { status })
  return response.data
}

// Candidates
export async function getCandidatesApi(params?: {
  search?: string
  page?: number
}): Promise<ApiResponse<{ data: AdminCandidate[]; total: number }>> {
  const response = await axiosInstance.get<ApiResponse<{ data: AdminCandidate[]; total: number }>>(
    `${BASE}/candidates`,
    { params }
  )
  return response.data
}

export async function deleteCandidateApi(
  candidateId: string
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE}/candidates/${candidateId}`)
  return response.data
}

export async function blockCandidateApi(
  userId: string,
  is_blocked: boolean
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.patch<ApiResponse<null>>(`${BASE}/users/${userId}/block`, { is_blocked })
  return response.data
}

// Plans
export async function getPlansApi(): Promise<ApiResponse<SubscriptionPlan[]>> {
  const response = await axiosInstance.get<ApiResponse<SubscriptionPlan[]>>(`${BASE}/plans`)
  return response.data
}

export async function updatePlanApi(
  planId: string,
  data: UpdatePlanPayload
): Promise<ApiResponse<SubscriptionPlan>> {
  const response = await axiosInstance.patch<ApiResponse<SubscriptionPlan>>(`${BASE}/plans/${planId}`, data)
  return response.data
}

// Inquiries
export async function getInquiriesApi(): Promise<ApiResponse<Inquiry[]>> {
  const response = await axiosInstance.get<ApiResponse<Inquiry[]>>(`${BASE}/inquiries`)
  return response.data
}

export async function updateInquiryStatusApi(
  inquiryId: string,
  status: 'open' | 'in_progress' | 'resolved'
): Promise<ApiResponse<null>> {
  const response = await axiosInstance.patch<ApiResponse<null>>(`${BASE}/inquiries/${inquiryId}/status`, { status })
  return response.data
}

// Messages
export async function getMessagesApi(
  inquiryId: string
): Promise<ApiResponse<Message[]>> {
  const response = await axiosInstance.get<ApiResponse<Message[]>>(`${BASE}/inquiries/${inquiryId}/messages`)
  return response.data
}

export async function sendMessageApi(
  data: SendMessagePayload
): Promise<ApiResponse<Message>> {
  const response = await axiosInstance.post<ApiResponse<Message>>(`${BASE}/messages`, data)
  return response.data
}
