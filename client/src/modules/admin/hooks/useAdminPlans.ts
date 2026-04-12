import { useQuery } from '@tanstack/react-query'
import { getPlansApi } from '../services/admin.service'

export function useAdminPlans() {
  return useQuery({
    queryKey: ['admin', 'plans'],
    queryFn: getPlansApi,
    staleTime: 1000 * 60 * 5
  })
}
