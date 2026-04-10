import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import PublicRoutes from '@/routes/publicRoutes'
import CandidateRoutes from '@/routes/candidateRoutes'
import EmployerRoutes from '@/routes/employerRoutes'
import AdminRoutes from '@/routes/adminRoutes'




const AppRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/candidate/*" element={<CandidateRoutes />} />
        <Route path="/employer/*" element={<EmployerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </AnimatePresence>
  )
}

const App: React.FC = () => {


  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
