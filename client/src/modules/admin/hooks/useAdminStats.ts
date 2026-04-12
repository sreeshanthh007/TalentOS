import { useQuery } from '@tanstack/react-query'
import { getAdminStatsApi } from '../services/admin.service'

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: getAdminStatsApi,
    staleTime: 1000 * 60 * 2
  })
}
