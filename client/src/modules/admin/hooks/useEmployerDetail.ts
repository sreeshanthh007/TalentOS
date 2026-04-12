import { useQuery } from '@tanstack/react-query'
import { getEmployerDetailApi } from '../services/admin.service'

export function useEmployerDetail(employerId: string) {
  return useQuery({
    queryKey: ['admin', 'employer', employerId],
    queryFn: () => getEmployerDetailApi(employerId),
    enabled: !!employerId
  })
}
