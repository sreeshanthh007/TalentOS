import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteJobApi } from '../services/employer.service'
import { toast } from 'sonner'


export function useDeleteJob() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteJobApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'jobs'] })
      queryClient.invalidateQueries({ queryKey: ['employer', 'stats'] })
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete job')
    }
  })
}
