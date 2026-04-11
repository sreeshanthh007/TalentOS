import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applyForJobApi } from '../services/candidate.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

export function useApplyForJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ jobId, resumeUrl }: { jobId: string; resumeUrl: string }) => 
      applyForJobApi(jobId, resumeUrl),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['candidate', 'applications'] })
      toast.success(response.message || 'Application submitted successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit application')
    }
  })
}
