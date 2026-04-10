import { axiosInstance } from '@/shared/utils/axiosInstance'
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
  axiosInstance.post('/auth/login', values).then((res) => res.data)

export const registerCandidateApi = async (
  values: CandidateRegisterValues
): Promise<ApiResponse<AuthResponseData>> =>
  axiosInstance.post('/auth/register/candidate', values).then((res) => res.data)

export const registerEmployerApi = async (
  values: EmployerRegisterValues
): Promise<ApiResponse<AuthResponseData>> =>
  axiosInstance.post('/auth/register/employer', values).then((res) => res.data)

export const logoutApi = async (): Promise<ApiResponse<null>> =>
  axiosInstance.post('/auth/logout').then((res) => res.data)

export const refreshTokenApi = async (): Promise<ApiResponse<TokenResponseData>> =>
  axiosInstance.post('/auth/refresh-token').then((res) => res.data)
