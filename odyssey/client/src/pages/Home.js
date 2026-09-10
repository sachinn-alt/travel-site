import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Star,
  MapPin,
  Clock,
  Heart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  Search,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';

import { TravelGlobe } from '../components/three/TravelGlobe';
import { SplitText } from '../components/reactbits/SplitText';
import { TiltCard } from '../components/reactbits/TiltCard';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { MagnetButton } from '../components/reactbits/MagnetButton';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog } from '../components/ui/dialog';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/ui/toast';
import { fallbackHomeData } from '../data/fallbackData';

const Home = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [homeData, setHomeData] = useState(fallbackHomeData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);

  // Search Widget State
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTravelers, setSearchTravelers] = useState(2);

  useEffect(() => {
    // Attempt to fetch from backend API, fallback seamlessly if server is offline
    fetch('http://localhost:5000/api/home')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setHomeData(data[0]);
        }
      })
      .catch(() => {
        // Fallback already pre-set
      });
  }, []);

  // Filter tours by category tab and search query
  const filteredTours = (homeData.featuredTours || fallbackHomeData.featuredTours).filter((tour) => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch = !searchDestination ||
      tour.place.toLowerCase().includes(searchDestination.toLowerCase()) ||
      tour.country?.toLowerCase().includes(searchDestination.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchDestination) {
      addToast({
        title: "Filtering Expeditions",
        message: `Showing curated tours matching "${searchDestination}".`,
        type: "info"
      });
    }
  };

  const handleBookTour = (tour) => {
    setSelectedTour(null);
    navigate('/booking', { state: { selectedTour: tour, travelers: searchTravelers } });
  };

  return (
    <div>
      {/* 1. HERO SECTION WITH THREE.JS GLOBE */}
      <section className="hero-section">
        <div className="hero-ambient-glow" />

        <div className="max-w-7xl hero-grid">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-badge-pill">
              <Sparkles size={15} className="text-amber-400" />
              <span>Nominated World's Best Bespoke Curator 2026</span>
            </div>

            <h1 className="hero-title">
              <SplitText text="Journey Beyond The Ordinary" tag="span" />
            </h1>

            <p className="hero-subtitle">
              Hand-crafted private expeditions, clifftop sanctuaries, and intimate cultural odysseys curated for discerning explorers worldwide.
            </p>

            <div className="hero-actions">
              <MagnetButton strength={20}>
                <Button
                  variant="luxury"
                  size="lg"
                  onClick={() => navigate('/category/international')}
                  className="rounded-2xl"
                >
                  Explore Expeditions <ArrowRight size={18} />
                </Button>
              </MagnetButton>

              <Button
                variant="darkGlass"
                size="lg"
                onClick={() => navigate('/gallery')}
                className="rounded-2xl"
              >
                View Visual Portfolio
              </Button>
            </div>

            {/* Metrics */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-value">40+</span>
                <span className="stat-label">Bespoke Regions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">14,000+</span>
                <span className="stat-label">Happy Explorers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.96 ★</span>
                <span className="stat-label">Guest Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Carbon Neutral</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Three.js Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TravelGlobe />
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE SEARCH WIDGET */}
      <div className="max-w-7xl search-widget-container">
        <form onSubmit={handleSearchSubmit} className="search-widget-card">
          <div className="search-field">
            <label><MapPin size={13} className="inline mr-1 text-amber-500" /> Destination / Country</label>
            <input
              type="text"
              placeholder="e.g. Amalfi, Kyoto, Rajasthan, Swiss Alps"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
          </div>

          <div className="search-divider hidden md:block" />

          <div className="search-field">
            <label><Calendar size={13} className="inline mr-1 text-sky-500" /> Voyage Season</label>
            <input
              type="text"
              placeholder="Spring / Autumn 2026"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>

          <div className="search-divider hidden md:block" />

          <div className="search-field">
            <label><Users size={13} className="inline mr-1 text-emerald-500" /> Guests</label>
            <select
              value={searchTravelers}
              onChange={(e) => setSearchTravelers(Number(e.target.value))}
            >
              <option value={1}>1 Solo Explorer</option>
              <option value={2}>2 Guests (Couple)</option>
              <option value={4}>4 Guests (Family/Group)</option>
              <option value={8}>8+ Private Charter</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="luxury"
            className="px-6 py-3.5 rounded-xl font-bold shadow-glow"
          >
            <Search size={18} /> Find Journeys
          </Button>
        </form>
      </div>

      {/* 3. FEATURED TOURS WITH TILT & SPOTLIGHT CARDS */}
      <section className="section-padding">
        <div className="max-w-7xl">
          <div className="section-header">
            <span className="section-tag">Curated Portfolio</span>
            <h2 className="section-title">Iconic Signature Expeditions</h2>
            <p className="section-desc">
              Every itinerary includes private local guides, luxury boutique sanctuaries, and 24/7 silent concierge support.
            </p>

            {/* Category Filter Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6 flex-wrap justify-center gap-1">
              {[
                { id: 'all', label: 'All Expeditions' },
                { id: 'coastal', label: '🏖️ Coastal & Islands' },
                { id: 'mountain', label: '🏔️ Alpine & High Passes' },
                { id: 'culture', label: '🏛️ Cultural Heritage' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl border-none cursor-pointer transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'bg-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tours Grid */}
          <div className="tours-grid-modern">
            {filteredTours.map((tour, idx) => {
              const inWishlist = isInWishlist(tour.id || tour.place);

              return (
                <motion.div
                  key={tour.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard maxTilt={8}>
                    <div className="tour-card-wrapper">
                      {/* Image Box */}
                      <div className="tour-image-container">
                        <img src={tour.image} alt={tour.place} loading="lazy" />

                        {tour.badge && (
                          <div className="tour-badge-overlay">
                            <Badge variant="gold">{tour.badge}</Badge>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            toggleWishlist(tour);
                            addToast({
                              title: inWishlist ? "Removed from Wishlist" : "Saved to Wishlist",
                              message: `${tour.place} has been updated in your bookmarks.`,
                              type: inWishlist ? "info" : "success"
                            });
                          }}
                          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                          aria-label="Wishlist"
                        >
                          <Heart size={18} className={inWishlist ? "fill-rose-500 text-rose-500" : ""} />
                        </button>

                        <div className="tour-meta-pill">
                          <Clock size={13} /> {tour.duration}
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="tour-content-box">
                        <div className="tour-location-row">
                          <span className="tour-country">
                            <MapPin size={12} className="inline mr-1" /> {tour.country || (tour.region === 'domestic' ? 'India' : 'International')}
                          </span>
                          <div className="tour-rating">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span>{tour.rating || 4.9}</span>
                            <span className="text-slate-400 font-normal text-xs">({tour.reviewsCount || 120})</span>
                          </div>
                        </div>

                        <h3 className="tour-title">{tour.place}</h3>
                        <p className="tour-desc">{tour.description}</p>

                        <div className="tour-footer-row">
                          <div className="tour-price-box">
                            <span className="tour-price-label">Starting From</span>
                            <span className="tour-price-value">{formatPrice(tour.price)}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTour(tour)}
                            >
                              Details
                            </Button>
                            <Button
                              variant="luxury"
                              size="sm"
                              onClick={() => handleBookTour(tour)}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY ODYSSEY — REACT BITS SPOTLIGHT CARDS */}
      <section className="section-padding why-odyssey-section">
        <div className="max-w-7xl">
          <div className="section-header">
            <span className="section-tag">The Odyssey Distinction</span>
            <h2 className="section-title">Why Connoisseurs Travel With Us</h2>
            <p className="section-desc">
              We eliminate the predictable, granting you intimate access to the people and sanctuaries that define our planet.
            </p>
          </div>

          <div className="highlights-grid">
            {(homeData.highlights || fallbackHomeData.highlights).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(245, 158, 11, 0.18)"
                  className="h-full"
                >
                  <div className="highlight-icon-box">
                    {i === 0 && <Compass size={28} />}
                    {i === 1 && <ShieldCheck size={28} />}
                    {i === 2 && <Sparkles size={28} />}
                    {i === 3 && <Leaf size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed m-0">
                    {item.description || "Crafted to perfection with personalized care, private aviation, and conservation commitment."}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUEST STORIES / TESTIMONIALS */}
      <section className="section-padding">
        <div className="max-w-7xl">
          <div className="section-header">
            <span className="section-tag">Guest Dispatches</span>
            <h2 className="section-title">Memories from Extraordinary Journeys</h2>
            <p className="section-desc">
              Real reflections from couples, families, and solo adventurers who stepped into the unknown with Odyssey.
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: "Vikram & Ananya Malhotra",
                location: "Mumbai",
                tour: "Swiss Alps & Glacier Express",
                quote: "The private fondue in Zermatt directly facing the Matterhorn at dusk will remain in our hearts forever. Odyssey’s concierge anticipated every whisper."
              },
              {
                name: "Lady Clementine V.",
                location: "London",
                tour: "Royal Rajasthan Palace Expedition",
                quote: "Staying at the Taj Lake Palace and waking up to the dawn mist over Udaipur was sublime. The private vintage motorcade was pure fairytale."
              },
              {
                name: "Kaito Takahashi",
                location: "Tokyo",
                tour: "Amalfi Coast & Capri Yacht Odyssey",
                quote: "Our private Riva boat dropped anchor in secluded coves where no tourist ferries could venture. Unbelievable culinary masterclasses in Positano."
              }
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="testimonial-card"
              >
                <div>
                  <div className="flex gap-1 mb-3 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                </div>

                <div className="testimonial-user">
                  <div className="user-avatar">{t.name[0]}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 m-0">{t.name}</h4>
                    <span className="text-xs text-slate-400">{t.location} • {t.tour}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VIP NEWSLETTER CLUB */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl">
          <div className="newsletter-card">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Exclusive Dispatch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Join The Odyssey Collectors Club
            </h2>
            <p className="text-slate-300 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Receive confidential alerts on private island charters, secret villa acquisitions, and unreleased small-group voyages.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addToast({
                  title: "Welcome to the Collectors Circle",
                  message: "Your private catalog link has been dispatched.",
                  type: "success"
                });
              }}
              className="newsletter-form"
            >
              <input
                type="email"
                placeholder="Enter your personal email"
                required
                className="newsletter-input"
              />
              <Button variant="luxury" type="submit" className="font-bold whitespace-nowrap">
                Request Invitation
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. TOUR QUICK-VIEW DIALOG MODAL */}
      {selectedTour && (
        <Dialog
          isOpen={Boolean(selectedTour)}
          onClose={() => setSelectedTour(null)}
          title={selectedTour.place}
        >
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src={selectedTour.image}
                alt={selectedTour.place}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="gold">{selectedTour.badge || "Signature Voyage"}</Badge>
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
                <Clock size={13} /> {selectedTour.duration}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-1">
                Curator's Overview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTour.description}
              </p>
            </div>

            {selectedTour.highlights && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Expedition Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTour.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTour.itinerary && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Itinerary Sneak Peek
                </h4>
                <div className="space-y-2 border-l-2 border-amber-400/40 pl-3">
                  {selectedTour.itinerary.slice(0, 4).map((day) => (
                    <div key={day.day} className="text-xs">
                      <span className="font-bold text-amber-600">Day {day.day}:</span>{" "}
                      <span className="text-slate-700">{day.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Starting From</span>
                <span className="text-2xl font-black text-slate-900">
                  {formatPrice(selectedTour.price)}
                </span>
              </div>

              <Button
                variant="luxury"
                size="lg"
                onClick={() => handleBookTour(selectedTour)}
                className="font-bold"
              >
                Proceed to Book Journey <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Home;
