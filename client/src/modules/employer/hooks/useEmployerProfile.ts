import { useQuery } from '@tanstack/react-query'
import { getEmployerProfileApi } from '../services/employer.service'

export function useEmployerProfile() {
  return useQuery({
    queryKey: ['employer', 'profile'],
    queryFn: getEmployerProfileApi,
    staleTime: 1000 * 60 * 5
  })
}
