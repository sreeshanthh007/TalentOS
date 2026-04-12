import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { UpdateJobPayload } from '@/shared/types'
import { updateJobApi } from '../services/employer.service'

export function useUpdateJob() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateJobPayload }) => updateJobApi(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'jobs'] })
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update job')
    }
  })
}
