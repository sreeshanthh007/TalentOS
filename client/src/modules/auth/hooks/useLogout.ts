import { useMutation } from '@tanstack/react-query'
import { logoutApi } from '../services/auth.service'
import { useAppDispatch } from '@/store/hooks'
import { candidateLogout } from '@/store/slices/candidateSlice'
import { employerLogout } from '@/store/slices/employerSlice'
import { adminLogout } from '@/store/slices/adminSlice'
import { getSession, clearSession } from '@/shared/utils/session'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.constants'

export function useLogout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      const session = getSession()
      if (session) {
        if (session.role === 'candidate') dispatch(candidateLogout())
        else if (session.role === 'employer') dispatch(employerLogout())
        else if (session.role === 'admin') dispatch(adminLogout())
      }
      clearSession()
      navigate(ROUTES.AUTH.LOGIN)
    },
    onError: () => {
      // Force clear on error as well as fallback
      const session = getSession()
      if (session) {
        if (session.role === 'candidate') dispatch(candidateLogout())
        else if (session.role === 'employer') dispatch(employerLogout())
        else if (session.role === 'admin') dispatch(adminLogout())
      }
      clearSession()
      navigate(ROUTES.AUTH.LOGIN)
    }
  })
}
