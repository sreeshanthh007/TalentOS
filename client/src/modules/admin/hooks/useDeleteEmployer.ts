import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEmployerApi } from '../services/admin.service'
import { toast } from 'sonner'
import { MESSAGES } from '@/shared/constants/messages.constants'

export function useDeleteEmployer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEmployerApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'employers'] })
      toast.success(MESSAGES.ADMIN.EMPLOYER_DELETED)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete employer')
    }
  })
}
