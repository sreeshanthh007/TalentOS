import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Building2, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  UserCircle
} from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/shared/constants/routes.constants'
import { cn } from '@/shared/utils/cn'
import { useLogout } from '@/modules/auth/hooks/useLogout'

const adminSidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD },
  { icon: Building2, label: 'Employers', path: ROUTES.ADMIN.EMPLOYERS },
  { icon: Users, label: 'Candidates', path: ROUTES.ADMIN.CANDIDATES },
  { icon: CreditCard, label: 'Plans', path: ROUTES.ADMIN.PLANS },
  { icon: MessageSquare, label: 'Inquiries', path: ROUTES.ADMIN.INQUIRIES },
]

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const user = useAppSelector((state) => state.admin.admin)
  const location = useLocation()
  const { mutate: logout } = useLogout()

  const handleLogout = () => {
    logout()
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
            TalentOS <span className="text-[10px] font-black px-2 py-0.5 bg-white/5 rounded text-coral-400">ADMIN</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium">Administrator</span>
            <span className="text-[10px] text-teal-300/70">{user?.email}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center overflow-hidden">
            <UserCircle size={24} className="text-teal-400" />
          </div>
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
        <aside className="hidden lg:block w-64 bg-[#0a2329] border-r border-teal-900/30 min-h-[calc(100vh-64px)] p-4 sticky top-16">
          <nav className="space-y-1">
            {adminSidebarItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.label}
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
                      layoutId="sidebar-active-admin"
                      className="absolute left-0 w-1 h-6 bg-teal-500 rounded-r-full"
                    />
                  )}
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-teal-400" : "group-hover:text-teal-400"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
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
                  {adminSidebarItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path)
                    return (
                      <Link
                        key={item.label}
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
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
