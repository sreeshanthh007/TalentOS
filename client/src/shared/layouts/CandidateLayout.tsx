import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  FileText, 
  UserCircle, 
  Bell, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { candidateLogout } from '@/store/slices/candidateSlice'
import { clearSession } from '@/shared/utils/session'
import { logoutApi } from '@/shared/services/auth.service'
import { ROUTES } from '@/shared/constants/routes.constants'
import { cn } from '@/shared/utils/cn'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.CANDIDATE.DASHBOARD },
  { icon: Briefcase, label: 'Applied Jobs', path: ROUTES.CANDIDATE.APPLIED_JOBS },
  { icon: Bookmark, label: 'Shortlisted', path: ROUTES.CANDIDATE.SHORTLISTED },
  { icon: FileText, label: 'Resume Builder', path: ROUTES.CANDIDATE.RESUME_BUILDER },
  { icon: UserCircle, label: 'Profile', path: ROUTES.CANDIDATE.PROFILE },
]

export const CandidateLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const user = useAppSelector((state) => state.candidate.candidate)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logoutApi()
      clearSession()
      dispatch(candidateLogout())
      navigate(ROUTES.AUTH.LOGIN)
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#051114] text-white">
      {/* Topbar */}
      <motion.header 
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        className="h-16 bg-[#0D4F4F] border-b border-teal-800/30 flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-teal-300 bg-clip-text text-transparent">
            TalentOS
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium">{user?.full_name}</span>
            <span className="text-[10px] text-teal-300/70">Candidate</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center overflow-hidden">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold">{user?.full_name?.[0]}</span>
            )}
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={20} className="text-teal-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-coral-500 rounded-full" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 bg-[#0a2329] border-r border-teal-900/30 min-h-[calc(110vh-64px)] p-4 sticky top-16">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-teal-500/10 text-teal-300" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-teal-500 rounded-r-full"
                    />
                  )}
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-teal-400" : "group-hover:text-teal-400"
                  )} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-[#0a2329] z-[70] p-6 lg:hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-teal-400">TalentOS</span>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                    <X size={24} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                          isActive 
                            ? "bg-teal-500/20 text-teal-300 border-l-4 border-teal-500" 
                            : "text-gray-400 hover:bg-white/5"
                        )}
                      >
                        <item.icon size={22} />
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
