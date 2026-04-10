import { useMutation } from '@tanstack/react-query'
import { registerEmployerApi } from '@/shared/services/auth.service'
import { type EmployerRegisterValues, type ApiResponse, type AuthResponseData } from '@/shared/types'

export function useRegisterEmployer() {
  return useMutation<ApiResponse<AuthResponseData>, unknown, EmployerRegisterValues>({
    mutationFn: registerEmployerApi,
    retry: 0,
  })
}
