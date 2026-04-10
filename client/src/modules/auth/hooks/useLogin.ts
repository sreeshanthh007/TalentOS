import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../services/auth.service'
import { type LoginValues, type ApiResponse, type AuthResponseData } from '@/shared/types'

export function useLogin() {
  return useMutation<ApiResponse<AuthResponseData>, unknown, LoginValues>({
    mutationFn: loginApi,
  })
}
