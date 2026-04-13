import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChatWindow } from '../components/ChatWindow'
import { useInquiries } from '../hooks/useInquiries'
import { useMessages } from '../hooks/useMessages'
import { useSendMessage } from '../hooks/useSendMessage'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes.constants'
import type { RootState } from '@/store'

const AdminChatPage: React.FC = () => {
  const { id: inquiryId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: inquiriesRes } = useInquiries()
  const { data: messagesRes, isLoading } = useMessages(inquiryId || '')
  const { mutate: sendMessage, isPending } = useSendMessage()
  const admin = useSelector((state: RootState) => state.admin.admin)

  const currentInquiry = inquiriesRes?.data.find(q => q.id === inquiryId)
  const messages = messagesRes?.data || []

  if (!inquiryId) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
         <button 
           onClick={() => navigate(ROUTES.ADMIN.INQUIRIES)}
           className="flex items-center gap-2 group text-gray-500 hover:text-white transition-colors"
         >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all">
               <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Inquiries</span>
         </button>

         {currentInquiry && (
            <div className="text-right">
               <h2 className="text-sm font-black text-white uppercase italic tracking-widest">{currentInquiry.employer?.company_name}</h2>
               <p className="text-[10px] text-gray-500 font-bold uppercase">{currentInquiry.subject}</p>
            </div>
         )}
      </div>

      <ChatWindow 
        inquiryId={inquiryId}
        currentRole="admin"
        currentUserId={admin?.id || ''}
        title={currentInquiry?.subject}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={(content) => sendMessage({ inquiry_id: inquiryId, content })}
        isSending={isPending}
      />
    </div>
  )
}

export default AdminChatPage
