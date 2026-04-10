import { useMutation } from '@tanstack/react-query'
import { registerCandidateApi } from '../services/auth.service'
import { type CandidateRegisterValues, type ApiResponse, type AuthResponseData } from '@/shared/types'

export function useRegisterCandidate() {
  return useMutation<ApiResponse<AuthResponseData>, unknown, CandidateRegisterValues>({
    mutationFn: registerCandidateApi,
  })
}
