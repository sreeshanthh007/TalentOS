import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { getSession } from '@/shared/utils/session'
import { ROUTES } from '@/shared/constants/routes.constants'
import { type UserRole } from '@/shared/types'
import { PageTransition } from './PageTransition'

interface ProtectedRouteProps {
  role: UserRole
  children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const isCandidateAuth = useAppSelector(state => state.candidate.isAuthenticated)
  const isEmployerAuth = useAppSelector(state => state.employer.isAuthenticated)
  const isAdminAuth = useAppSelector(state => state.admin.isAuthenticated)

  const session = getSession()

  let isAuthenticated = false
  if (role === 'candidate') isAuthenticated = isCandidateAuth
  if (role === 'employer') isAuthenticated = isEmployerAuth
  if (role === 'admin') isAuthenticated = isAdminAuth

  if (!isAuthenticated || !session || session.role !== role) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />
  }

  return <PageTransition>{children}</PageTransition>
}
