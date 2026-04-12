import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAppDispatch } from '@/store/hooks'
import { employerLogin } from '@/store/slices/employerSlice'
import type { EmployerUser } from '@/shared/types'
import { updateEmployerProfileApi } from '../services/employer.service'

export function useUpdateEmployerProfile() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  
  return useMutation({
    mutationFn: (data: Partial<EmployerUser>) => updateEmployerProfileApi(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employer', 'profile'] })
      dispatch(employerLogin(response.data))
      toast.success(response.message)
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })
}
