import React, { useState } from 'react'
import { CandidateTable } from '../components/CandidateTable'
import { useCandidates } from '../hooks/useCandidates'
import { useBlockUser } from '../hooks/useBlockUser'
import { useDeleteCandidate } from '../hooks/useDeleteCandidate'
import { Search } from 'lucide-react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { ConfirmModal } from '@/shared/components/common/ConfirmModal'

const CandidateManagementPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebounce(search, 500)

  const { data: res, isLoading } = useCandidates({ search: debouncedSearch, page })
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser()
  const { mutate: deleteCandidate, isPending: isDeleting } = useDeleteCandidate()

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'block' | 'delete';
    userId?: string;
    candidateId?: string;
    isBlocked?: boolean;
    name?: string;
  }>({ isOpen: false, type: 'delete' })

  const handleAction = (data: typeof confirmModal) => {
    setConfirmModal(data)
  }

  const handleConfirm = () => {
    if (confirmModal.type === 'block' && confirmModal.userId) {
      blockUser({ 
        userId: confirmModal.userId, 
        isBlocked: !!confirmModal.isBlocked, 
        role: 'candidate' 
      }, {
        onSuccess: () => setConfirmModal({ ...confirmModal, isOpen: false })
      })
    } else if (confirmModal.type === 'delete' && confirmModal.candidateId) {
      deleteCandidate(confirmModal.candidateId, {
        onSuccess: () => setConfirmModal({ ...confirmModal, isOpen: false })
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Candidate <span className="text-mint-400">Library</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Audit and moderate user profiles</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-mint-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0D4F4F]/20 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-mint-500/50 w-full md:w-80 transition-all shadow-xl shadow-black/20"
          />
        </div>
      </div>

      <CandidateTable 
        candidates={res?.data.data || []}
        isLoading={isLoading}
        onViewResume={(url) => window.open(url, '_blank')}
        onBlock={(uid, status) => handleAction({
          isOpen: true,
          type: 'block',
          userId: uid,
          isBlocked: status,
          name: res?.data.data.find(c => c.user_id === uid)?.full_name
        })}
        onDelete={(id) => handleAction({
          isOpen: true,
          type: 'delete',
          candidateId: id,
          name: res?.data.data.find(c => c.id === id)?.full_name
        })}
      />

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirm}
        title={confirmModal.type === 'block' ? (confirmModal.isBlocked ? 'Block User?' : 'Unblock User?') : 'Delete Candidate?'}
        message={confirmModal.type === 'block' 
          ? `Are you sure you want to ${confirmModal.isBlocked ? 'block' : 'unblock'} ${confirmModal.name || 'this user'}? ${confirmModal.isBlocked ? 'They will lose access to their account.' : 'They will regain access.'}`
          : `Permanently delete ${confirmModal.name || 'this candidate'}'s record? This cannot be undone.`
        }
        confirmText={confirmModal.type === 'block' ? (confirmModal.isBlocked ? 'Block Now' : 'Unblock Now') : 'Delete Permanently'}
        type={confirmModal.type === 'delete' ? 'danger' : 'warning'}
        isLoading={isBlocking || isDeleting}
      />
    </div>
  )
}

export default CandidateManagementPage
