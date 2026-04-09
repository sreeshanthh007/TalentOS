import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';

import PublicRoutes from '@/routes/publicRoutes';
import CandidateRoutes from '@/routes/candidateRoutes';
import EmployerRoutes from '@/routes/employerRoutes';
import AdminRoutes from '@/routes/adminRoutes';
import { useAppInit } from '@/shared/hooks/useAppInit';

const App: React.FC = () => {
  const { isInitializing } = useAppInit();

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a2329]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-4 border-t-teal-500 border-r-teal-500 border-b-transparent border-l-transparent"
        />
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/candidate/*" element={<CandidateRoutes />} />
            <Route path="/employer/*" element={<EmployerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
};

export default App;
