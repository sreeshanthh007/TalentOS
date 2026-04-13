import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes.constants';
import { useAppSelector } from '@/store/hooks';

const navLinks = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Jobs', path: ROUTES.PUBLIC.JOBS },
  { name: 'Employers', path: ROUTES.PUBLIC.EMPLOYERS },
  { name: 'About', path: ROUTES.PUBLIC.ABOUT },
];

export const PublicLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated: isCandidateAuthenticated } = useAppSelector(state => state.candidate);
  const { isAuthenticated: isEmployerAuthenticated } = useAppSelector(state => state.employer);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a2329] font-sans text-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 bg-[#0D4F4F] shadow-lg border-b border-teal-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-400 rounded-sm flex items-center justify-center font-bold text-xl text-[#0D4F4F]">
              T
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              TalentOS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path || (link.path !== ROUTES.HOME && location.pathname.startsWith(link.path));
              return (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  key={link.path}
                >
                  <Link 
                    to={link.path} 
                    className={`relative font-medium transition-colors hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal-400"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {!isCandidateAuthenticated && !isEmployerAuthenticated && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link to={ROUTES.AUTH.LOGIN} className="text-white hover:text-teal-400 font-medium transition-colors">
                  Login
                </Link>
              </motion.div>
            )}
            
            {!isCandidateAuthenticated && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <Link 
                  to={isEmployerAuthenticated ? ROUTES.EMPLOYER.DASHBOARD : ROUTES.AUTH.REGISTER_EMPLOYER} 
                  className="bg-teal-500 hover:bg-teal-400 text-[#0a2329] font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                >
                  {isEmployerAuthenticated ? 'Employer Dashboard' : 'Post a Job'}
                </Link>
              </motion.div>
            )}

            {isCandidateAuthenticated && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <Link 
                  to={ROUTES.CANDIDATE.DASHBOARD}
                  className="bg-teal-500 hover:bg-teal-400 text-[#0a2329] font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                >
                  Candidate Dashboard
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0D4F4F] border-b border-teal-900 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-lg ${location.pathname === link.path ? 'bg-teal-900/50 text-teal-400' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-teal-900/50 my-2" />
              {!isCandidateAuthenticated && !isEmployerAuthenticated && (
                <Link 
                  to={ROUTES.AUTH.LOGIN}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-medium p-2 rounded-lg"
                >
                  Login
                </Link>
              )}
              
              {!isCandidateAuthenticated && (
                <Link 
                  to={isEmployerAuthenticated ? ROUTES.EMPLOYER.DASHBOARD : ROUTES.AUTH.REGISTER_EMPLOYER}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-teal-500 text-center text-[#0a2329] font-bold p-3 rounded-lg mt-2"
                >
                  {isEmployerAuthenticated ? 'Employer Dashboard' : 'Post a Job'}
                </Link>
              )}

              {isCandidateAuthenticated && (
                <Link 
                  to={ROUTES.CANDIDATE.DASHBOARD}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-teal-500 text-center text-[#0a2329] font-bold p-3 rounded-lg mt-2"
                >
                  Candidate Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow bg-[#0a2329] min-w-0">
        <Outlet />
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[#0a2329] border-t border-teal-900/50 pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-400 rounded-sm flex items-center justify-center font-bold text-[#0D4F4F]">
                  T
                </div>
                <span className="text-xl font-bold text-white">TalentOS</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Connecting talent with opportunity. The AI-powered platform designed for the modern remote and hybrid workforce.
              </p>
            </div>
            
            {/* Col 2 */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-teal-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
              <p className="text-gray-400 mb-6">hello@talentos.com<br />1-800-TALENT-1</p>
              <div className="flex gap-4">
                {/* <a href="#" className="w-10 h-10 rounded-full bg-[#0d2e36] border border-teal-900/50 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0d2e36] border border-teal-900/50 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0d2e36] border border-teal-900/50 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors">
                  <Github size={18} />
                </a> */}
              </div>
            </div>

          </div>
          
          <div className="border-t border-teal-900/50 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-teal-900 text-sm">
              © 2024 TalentOS. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-teal-900">
              <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
