import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blockCandidateApi, blockEmployerApi, unblockEmployerApi } from '../services/admin.service'
import { toast } from 'sonner'

export function useBlockUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, isBlocked, role }: { userId: string; isBlocked: boolean; role: 'employer' | 'candidate' }) => {
      if (role === 'employer') {
        return isBlocked ? blockEmployerApi(userId) : unblockEmployerApi(userId)
      } else {
        return blockCandidateApi(userId, isBlocked)
      }
    },
    onSuccess: (_, { role }) => {
      const type = role === 'employer' ? 'employers' : 'candidates'
      queryClient.invalidateQueries({ queryKey: ['admin', type] })
      const label = role === 'employer' ? 'Employer' : 'Candidate'
      toast.success(`${label} status updated successfully`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update user status')
    }
  })
}
