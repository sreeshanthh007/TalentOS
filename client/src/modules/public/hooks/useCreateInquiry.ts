import { useMutation } from '@tanstack/react-query'
import { createInquiryApi } from '../services/inquiry.service'
import type { ContactInquiryPayload, ApiResponse } from '@/shared/types'

export function useCreateInquiry() {
  return useMutation<ApiResponse<null>, unknown, ContactInquiryPayload>({
    mutationFn: createInquiryApi,
  })
}
