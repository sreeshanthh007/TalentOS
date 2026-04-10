import { axiosInstance } from '@/shared/utils/axiosInstance'
import { API_ENDPOINTS } from '@/shared/constants/api.routes'
import type {
  LoginValues,
  CandidateRegisterValues,
  EmployerRegisterValues,
  AuthResponseData,
  TokenResponseData,
} from '@/shared/types'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const loginApi = async (
  values: LoginValues
): Promise<ApiResponse<AuthResponseData>> =>
  axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, values).then((res) => res.data)

export const registerCandidateApi = async (
  values: CandidateRegisterValues
): Promise<ApiResponse<AuthResponseData>> =>
  axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_CANDIDATE, values).then((res) => res.data)

export const registerEmployerApi = async (
  values: EmployerRegisterValues
): Promise<ApiResponse<AuthResponseData>> =>
  axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER_EMPLOYER, values).then((res) => res.data)

export const logoutApi = async (): Promise<ApiResponse<null>> =>
  axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT).then((res) => res.data)

export const refreshTokenApi = async (role?: string): Promise<ApiResponse<TokenResponseData>> =>
  axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, role ? { role } : undefined).then((res) => res.data)
