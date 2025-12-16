import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ReviewsPage from './pages/ReviewsPage';
import OrderPage from './pages/OrderPage';

import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';

import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

import TwitterPage from './pages/TwitterPage';
import InstagramPage from './pages/InstagramPage';
import FacebookPage from './pages/FacebookPage';

import DashboardPage from './pages/DashboardPage';

// Layout for public pages (with Header and Footer)
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public Routes with Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/twitter" element={<TwitterPage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/facebook" element={<FacebookPage />} />
        </Route>

        {/* Dashboard Route (Standalone) */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
