import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SchoolsPage from './pages/SchoolsPage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import ComparePage from './pages/ComparePage';
import LoansPage from './pages/LoansPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import AlumniPage from './pages/AlumniPage';
import FundraisingPage from './pages/FundraisingPage';
import PoliciesPage from './pages/PoliciesPage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { i18n } = useTranslation();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schools" element={<SchoolsPage />} />
              <Route path="/schools/:id" element={<SchoolDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/scholarships" element={<ScholarshipsPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/fundraising" element={<FundraisingPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;