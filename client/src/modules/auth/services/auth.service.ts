import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.constants'
import {
  type LoginValues,
  type CandidateRegisterValues,
  type EmployerRegisterValues,
  type ApiResponse,
  type AuthResponseData
} from '@/shared/types'

export async function loginApi(data: LoginValues): Promise<ApiResponse<AuthResponseData>> {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data)
  return response.data
}

export async function registerCandidateApi(data: CandidateRegisterValues): Promise<ApiResponse<AuthResponseData>> {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_CANDIDATE, data)
  return response.data
}

export async function registerEmployerApi(data: EmployerRegisterValues): Promise<ApiResponse<AuthResponseData>> {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_EMPLOYER, data)
  return response.data
}

export async function logoutApi(): Promise<ApiResponse<null>> {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT)
  return response.data
}

export async function refreshTokenApi(role?: string): Promise<ApiResponse<null>> {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, role ? { role } : undefined)
  return response.data
}
