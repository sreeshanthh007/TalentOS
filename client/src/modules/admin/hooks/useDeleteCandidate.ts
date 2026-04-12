import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCandidateApi } from '../services/admin.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

export function useDeleteCandidate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCandidateApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'candidates'] })
      toast.success(MESSAGES.ADMIN.CANDIDATE_DELETED)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete candidate')
    }
  })
}
