import { useQuery } from '@tanstack/react-query'
import { getInquiryMessagesApi } from '../services/employer.service'

export function useInquiryMessages(inquiryId: string) {
  return useQuery({
    queryKey: ['messages', inquiryId],
    queryFn: () => getInquiryMessagesApi(inquiryId),
    enabled: !!inquiryId
  })
}
