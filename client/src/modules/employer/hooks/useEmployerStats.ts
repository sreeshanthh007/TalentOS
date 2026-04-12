import { useQuery } from '@tanstack/react-query'
import { getEmployerStatsApi } from '../services/employer.service'

export function useEmployerStats() {
  return useQuery({
    queryKey: ['employer', 'stats'],
    queryFn: getEmployerStatsApi,
    staleTime: 1000 * 60 * 2
  })
}
