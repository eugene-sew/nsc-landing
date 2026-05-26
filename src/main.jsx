import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import LegalHub from './pages/LegalHub.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import AppAccess from './pages/AppAccess.jsx'
import AdsPolicy from './pages/AdsPolicy.jsx'
import ContentRating from './pages/ContentRating.jsx'
import TargetAudience from './pages/TargetAudience.jsx'
import DataSafety from './pages/DataSafety.jsx'
import GovernmentApps from './pages/GovernmentApps.jsx'
import FinancialFeatures from './pages/FinancialFeatures.jsx'
import HealthFeatures from './pages/HealthFeatures.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/legal" element={<LegalHub />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/app-access" element={<AppAccess />} />
        <Route path="/ads" element={<AdsPolicy />} />
        <Route path="/content-rating" element={<ContentRating />} />
        <Route path="/target-audience" element={<TargetAudience />} />
        <Route path="/data-safety" element={<DataSafety />} />
        <Route path="/government-apps" element={<GovernmentApps />} />
        <Route path="/financial-features" element={<FinancialFeatures />} />
        <Route path="/health-features" element={<HealthFeatures />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
