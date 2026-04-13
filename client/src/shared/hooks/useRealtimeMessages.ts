import { useEffect } from 'react'
import { supabase } from '@/shared/config/supabase.client'
import { useQueryClient } from '@tanstack/react-query'
import type { Message, ApiResponse } from '@/shared/types'

export function useRealtimeMessages(inquiryId: string) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!inquiryId) return

    // Subscribe to messages table filtered by inquiry_id
    const channel = supabase
      .channel(`messages:${inquiryId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiryId}`
        },
           (payload) => {
         console.log("NEW MESSAGE:", payload) 
          // Append new message to existing query cache
          queryClient.setQueryData(
            ['messages', inquiryId],
            (old: ApiResponse<Message[]> | undefined) => {
              if (!old) return old
              const newMessage = payload.new as Message
              // Avoid duplicates
              const exists = old.data.some(m => m.id === newMessage.id)
              if (exists) return old
              return {
                ...old,
                data: [...old.data, newMessage]
              }
            }
          )
        }
      )
      .subscribe((status) => {
  console.log("Realtime status:", status)
})

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiryId, queryClient])
}
