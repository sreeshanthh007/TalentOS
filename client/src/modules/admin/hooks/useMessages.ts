import { useQuery } from '@tanstack/react-query'
import { getMessagesApi } from '../services/admin.service'

export function useMessages(inquiryId: string) {
  return useQuery({
    queryKey: ['messages', inquiryId],
    queryFn: () => getMessagesApi(inquiryId),
    enabled: !!inquiryId
  })
}
