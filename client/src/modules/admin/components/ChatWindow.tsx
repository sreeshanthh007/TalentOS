import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send,  MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/shared/utils/cn'
import { useMessages } from '@/modules/admin/hooks/useMessages'
import { useSendMessage } from '@/modules/admin/hooks/useSendMessage'
import { useRealtimeMessages } from '@/shared/hooks/useRealtimeMessages'

interface ChatWindowProps {
  inquiryId: string
  currentRole: 'admin' | 'employer'
  currentUserId: string
  title?: string
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  inquiryId,
  currentRole,
  currentUserId,
  title
}) => {
  const [content, setContent] = useState('')
  const { data: res, isLoading } = useMessages(inquiryId)
  const { mutate: sendMessage, isPending } = useSendMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useRealtimeMessages(inquiryId)

  const messages = res?.data || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!content.trim() || isPending) return
    sendMessage({ inquiry_id: inquiryId, content: content.trim() })
    setContent('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-[#0D4F4F]/20 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-2xl shadow-2xl">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
               <MessageSquare className="text-teal-400" size={20} />
            </div>
            <div>
               <h3 className="text-sm font-black text-white uppercase italic tracking-widest">{title || 'Live Inquiry Support'}</h3>
               <p className="text-[10px] text-teal-400 font-bold uppercase tracking-tighter">Real-time Connected</p>
            </div>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
         {isLoading ? (
            <div className="flex items-center justify-center h-full">
               <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
         ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
               <MessageSquare size={48} className="text-white mb-4" />
               <p className="text-sm text-white font-bold uppercase tracking-widest italic">Start the conversation</p>
            </div>
         ) : (
            <>
               {messages.map((msg) => {
                  const isMe = msg.sender_role === currentRole
                  return (
                     <motion.div
                       key={msg.id}
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       className={cn(
                          "flex",
                          isMe ? "justify-end" : "justify-start"
                       )}
                     >
                        <div className={cn(
                           "max-w-[80%] flex flex-col",
                           isMe ? "items-end" : "items-start"
                        )}>
                           <div className={cn(
                              "px-6 py-4 rounded-[30px] shadow-lg",
                              isMe ? "bg-teal-600 text-white rounded-tr-none" : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                           )}>
                              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                           </div>
                           <span className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-tighter">
                              {format(new Date(msg.sent_at), 'hh:mm a')}
                           </span>
                        </div>
                     </motion.div>
                  )
               })}
               <div ref={messagesEndRef} />
            </>
         )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-white/5 bg-white/5">
         <div className="relative group">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full bg-[#0a1e22]/50 border border-white/5 rounded-[30px] pl-6 pr-16 py-4 text-sm text-white focus:outline-none focus:border-teal-500/50 resize-none h-16 group-hover:border-white/10 transition-all placeholder:text-gray-600 placeholder:italic"
            />
            <button 
              onClick={handleSend}
              disabled={!content.trim() || isPending}
              className="absolute right-3 top-3 w-10 h-10 bg-teal-500 hover:bg-teal-400 disabled:opacity-30 text-white rounded-full flex items-center justify-center transition-all shadow-xl shadow-teal-500/20"
            >
              <Send size={18} />
            </button>
         </div>
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-4 text-center">Press ENTER to send</p>
      </div>
    </div>
  )
}
