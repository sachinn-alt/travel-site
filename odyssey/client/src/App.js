import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Category from './pages/Category';

import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/ui/toast';
import './App.css';

// Automatically scroll window to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/category/:type" element={<Category />} />
                  <Route path="/categories/:type" element={<Category />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}

export default App;
