import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import RegistrationModal from './components/RegistrationModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';
import RegistrationPage from './pages/RegistrationPage';

import { AppProvider } from './context/AppContext';

// Scroll to top on every route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content" className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/register/:id" element={<RegistrationPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <RegistrationModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

function App() {
  // Preloader runs only once per session or initial load
  const [showPreloader, setShowPreloader] = useState(() => {
    const hasLoaded = sessionStorage.getItem('stackly_preloader_shown');
    return !hasLoaded;
  });

  const handlePreloaderFinish = () => {
    sessionStorage.setItem('stackly_preloader_shown', 'true');
    setShowPreloader(false);
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        {showPreloader && <Preloader onFinish={handlePreloaderFinish} />}
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
