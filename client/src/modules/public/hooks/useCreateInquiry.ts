import { useMutation } from '@tanstack/react-query'
import { createInquiryApi } from '../services/public.services'
import type { ContactInquiryPayload, ApiResponse } from '@/shared/types'

export function useCreateInquiry() {
  return useMutation<ApiResponse<null>, unknown, ContactInquiryPayload>({
    mutationFn: createInquiryApi,
    retry: 0,
  })
}
