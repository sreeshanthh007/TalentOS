import { useMutation } from '@tanstack/react-query'
import { generateResumeContentApi } from '../services/candidate.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

export function useGenerateResume() {
  return useMutation({
    mutationFn: generateResumeContentApi,
    onSuccess: (response) => {
      toast.success(response.message || 'Resume generated successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to generate resume')
    }
  })
}
