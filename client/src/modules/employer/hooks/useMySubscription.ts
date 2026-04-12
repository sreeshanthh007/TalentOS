import { useQuery } from '@tanstack/react-query'
import { getMySubscriptionApi } from '../services/employer.service'

export function useMySubscription() {
  return useQuery({
    queryKey: ['employer', 'subscription'],
    queryFn: getMySubscriptionApi,
    staleTime: 1000 * 60 * 10
  })
}
