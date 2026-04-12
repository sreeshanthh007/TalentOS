import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitVerificationApi } from '../services/employer.service'
import { toast } from 'sonner'


export function useSubmitVerification() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: submitVerificationApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'profile'] })
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit verification')
    }
  })
}
