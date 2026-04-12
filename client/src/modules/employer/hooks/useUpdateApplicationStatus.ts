import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateApplicationStatusApi } from '../services/employer.service'
import { toast } from 'sonner'

import type { UpdateApplicationStatusPayload } from '@/shared/types'

export function useUpdateApplicationStatus(jobId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ applicationId, data }: { applicationId: string, data: UpdateApplicationStatusPayload }) => 
      updateApplicationStatusApi(applicationId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'applicants', jobId] })
      queryClient.invalidateQueries({ queryKey: ['employer', 'stats'] })
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  })
}
