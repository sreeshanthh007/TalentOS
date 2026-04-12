import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJobApi } from '../services/employer.service'
import { toast } from 'sonner'


export function useCreateJob() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createJobApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'jobs'] })
      queryClient.invalidateQueries({ queryKey: ['employer', 'stats'] })
      toast.success(response.message)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create job')
    }
  })
}
