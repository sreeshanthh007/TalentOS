import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateVerificationStatusApi } from '../services/admin.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

export function useUpdateVerification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ employerId, status }: { employerId: string; status: 'approved' | 'rejected' }) => 
      updateVerificationStatusApi(employerId, status),
    onSuccess: (_, { employerId, status }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'employers'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'employer', employerId] })
      
      const msg = status === 'approved' 
        ? MESSAGES.ADMIN.VERIFICATION_APPROVED 
        : MESSAGES.ADMIN.VERIFICATION_REJECTED
      toast.success(msg)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update verification status')
    }
  })
}
