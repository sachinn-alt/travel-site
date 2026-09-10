import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, ChevronDown, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currency, setCurrency, rates } = useCurrency();
  const { wishlist } = useWishlist();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-wrapper">
      <div className="max-w-7xl navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon-wrapper">
            <Compass size={24} strokeWidth={2.4} />
          </div>
          <div>
            <h1 className="brand-title">ODYSSEY</h1>
            <span className="brand-tag">Luxury Expeditions</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Explore
          </Link>

          {/* Destinations Dropdown */}
          <div className="nav-dropdown">
            <span className="nav-link dropdown-trigger">
              Destinations <ChevronDown size={14} />
            </span>
            <div className="dropdown-menu">
              <Link to="/category/domestic" className="dropdown-item">
                <span className="dropdown-item-title">🇮🇳 Incredible India</span>
                <span className="dropdown-item-desc">Himalayas, Palaces & Backwaters</span>
              </Link>
              <Link to="/category/international" className="dropdown-item">
                <span className="dropdown-item-title">🌍 World Wonders</span>
                <span className="dropdown-item-desc">Amalfi, Swiss Alps & Kyoto</span>
              </Link>
            </div>
          </div>

          <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>
            Gallery
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            Our Story
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Ateliers & Reviews
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
            aria-label="Select Currency"
          >
            {Object.keys(rates).map((curr) => (
              <option key={curr} value={curr}>
                {rates[curr].label}
              </option>
            ))}
          </select>

          {/* Wishlist Link */}
          <Link
            to="/booking"
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Saved Expeditions"
          >
            <Heart size={20} className={wishlist.length > 0 ? "fill-amber-400 text-amber-400" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CTA Book Expedition Button */}
          <button
            onClick={() => navigate('/booking')}
            className="btn-plan relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-glow hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer"
          >
            <Sparkles size={14} /> Plan Journey
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/98 border-b border-white/10 px-6 py-5 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white py-2 border-b border-white/5"
              >
                Explore Expeditions
              </Link>
              <Link
                to="/category/domestic"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
              >
                🇮🇳 Domestic Journeys (India)
              </Link>
              <Link
                to="/category/international"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
              >
                🌍 International Journeys
              </Link>
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
              >
                Visual Gallery
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
              >
                Our Story & Team
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
              >
                Ateliers & Reviews
              </Link>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/booking');
                  }}
                  className="w-full py-3 rounded-xl font-bold bg-amber-500 text-slate-950 uppercase tracking-wider text-xs border-none cursor-pointer"
                >
                  Plan Your Journey
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
