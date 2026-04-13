import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applyForJobApi } from '../services/candidate.service'

export function useApplyForJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ jobId, resumeUrl }: { jobId: string; resumeUrl: string }) => 
      applyForJobApi(jobId, resumeUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidate', 'applications'] })
    }
  })
}
