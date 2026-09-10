import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { useToast } from './ui/toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      title: "Welcome to the VIP Odyssey Club",
      message: "Check your inbox for our confidential 2026 Private Voyage Catalog.",
      type: "success"
    });
    setEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="max-w-7xl">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              <div className="brand-icon-wrapper">
                <Compass size={22} strokeWidth={2.4} />
              </div>
              <div>
                <h3 className="brand-title" style={{ fontSize: '1.4rem' }}>ODYSSEY</h3>
                <span className="brand-tag">Luxury Expeditions</span>
              </div>
            </Link>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Crafting transformative, bespoke expeditions to the world’s most pristine corners. Every journey is carbon-offset and directly funds indigenous heritage preservation.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <ShieldCheck size={14} /> 100% Certified Carbon-Neutral
              </span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="footer-col">
            <h4>Curated Havens</h4>
            <ul className="footer-links">
              <li><Link to="/category/domestic">Incredible India Expedition</Link></li>
              <li><Link to="/category/international">Amalfi Coast & Capri Yachting</Link></li>
              <li><Link to="/category/international">Swiss Alps & Glacier Express</Link></li>
              <li><Link to="/category/international">Kyoto & Mount Fuji Trail</Link></li>
              <li><Link to="/category/domestic">Royal Rajasthan Maharajah Palaces</Link></li>
              <li><Link to="/category/domestic">Ladakh High Altitude Monasteries</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="footer-col">
            <h4>The Atelier</h4>
            <ul className="footer-links">
              <li><Link to="/about">Our Curators & Philosophy</Link></li>
              <li><Link to="/gallery">Visual Journal & Portfolios</Link></li>
              <li><Link to="/booking">Private Concierge Inquiry</Link></li>
              <li><Link to="/contact">Global Office Ateliers</Link></li>
              <li><Link to="/contact">Traveler Stories & Reviews</Link></li>
              <li><a href="#faq">Bespoke Customization FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col">
            <h4>The Odyssey Dispatch</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Receive invitations to private island charters, secret villa openings, and unreleased itineraries.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your private email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
                style={{ fontSize: '0.85rem', padding: '10px 14px' }}
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-none cursor-pointer transition-all flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
            <div style={{ display: 'flex', gap: '14px', marginTop: '1.5rem', color: '#94a3b8' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors" aria-label="YouTube">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Odyssey Expeditions Ltd. All rights reserved. Crafted for curious souls.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" className="hover:text-amber-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-amber-400">Terms of Voyage</a>
            <a href="#security" className="hover:text-amber-400">Guest Protection</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;