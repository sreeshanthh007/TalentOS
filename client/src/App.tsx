import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Role-based Route Imports
import PublicRoutes from './routes/publicRoutes';
import CandidateRoutes from './routes/candidateRoutes';
import EmployerRoutes from './routes/employerRoutes';
import AdminRoutes from './routes/adminRoutes';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
