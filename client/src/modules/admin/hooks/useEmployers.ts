import { useQuery } from '@tanstack/react-query'
import { getEmployersApi } from '../services/admin.service'

export function useEmployers(params?: { search?: string; verification_status?: string; page?: number }) {
  return useQuery({
    queryKey: ['admin', 'employers', params],
    queryFn: () => getEmployersApi(params),
    staleTime: 1000 * 60 * 1
  })
}
