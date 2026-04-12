import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessageApi } from '../services/admin.service'
import type { SendMessagePayload } from '@/shared/types'

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SendMessagePayload) => sendMessageApi(data),
    onSuccess: (res) => {
      // Opt out of manual cache invalidation if using realtime, 
      // but provided here for robustness
      queryClient.invalidateQueries({ queryKey: ['messages', res.data.inquiry_id] })
    }
  })
}
