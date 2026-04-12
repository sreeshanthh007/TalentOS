import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { UploadDocumentPayload } from '@/shared/types'
import { uploadVerificationDocApi } from '../services/employer.service'

export function useUploadVerificationDoc() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UploadDocumentPayload) => uploadVerificationDocApi(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'verification', 'docs'] })
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload document')
    }
  })
}
