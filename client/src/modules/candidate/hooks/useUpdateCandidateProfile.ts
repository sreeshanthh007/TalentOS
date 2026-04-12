import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCandidateProfileApi } from '../services/candidate.service'
import { useAppDispatch } from '@/store/hooks'
import { candidateLogin } from '@/store/slices/candidateSlice'
import { toast } from 'sonner'


export function useUpdateCandidateProfile() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: updateCandidateProfileApi,
    onSuccess: (response) => {
      const updatedUser = response.data
      queryClient.invalidateQueries({ queryKey: ['candidate', 'profile'] })
      dispatch(candidateLogin(updatedUser))
      toast.success(response.message || 'Profile updated successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile')
    }
  })
}
