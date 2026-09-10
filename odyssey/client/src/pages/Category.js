import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, MapPin, Search, ArrowRight, Heart } from 'lucide-react';
import { TiltCard } from '../components/reactbits/TiltCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/ui/toast';
import { fallbackCategoriesData } from '../data/fallbackData';

const Category = () => {
  const { type = 'domestic' } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const currentCategoryData = fallbackCategoriesData[type] || fallbackCategoriesData.domestic;
  const [categoryData, setCategoryData] = useState(currentCategoryData);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Reset state when route param changes
    const defaultData = fallbackCategoriesData[type] || fallbackCategoriesData.domestic;
    setCategoryData(defaultData);
    setSelectedSubcategory('all');

    // Attempt backend fetch
    fetch(`http://localhost:5000/api/category/${type}`)
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.category) {
          setCategoryData(data);
        }
      })
      .catch(() => {
        // Fallback already active
      });
  }, [type]);

  const tours = categoryData.tours || [];

  // Filter & sort
  const filteredTours = tours
    .filter((tour) => {
      const matchSub = selectedSubcategory === 'all' || tour.subcategory === selectedSubcategory;
      const matchSearch = !searchQuery ||
        tour.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSub && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. REGIONAL HERO BANNER */}
      <div className="relative h-[340px] md:h-[400px] overflow-hidden">
        <img
          src={categoryData.image}
          alt={categoryData.category}
          className="w-full h-full object-cover filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
          <Badge variant="gold" className="w-fit mb-3">
            {type === 'domestic' ? '🇮🇳 Indian Subcontinent' : '🌍 Continental Voyages'}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
            {categoryData.category}
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            {categoryData.subtitle || "Explore curated journeys, private sanctuaries, and transformative cultural paths."}
          </p>
        </div>
      </div>

      {/* 2. FILTER & CONTROLS TOOLBAR */}
      <div className="bg-white border-b border-slate-200 sticky top-[76px] z-30 shadow-sm">
        <div className="max-w-7xl py-3.5 px-4 flex flex-wrap items-center justify-between gap-4">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border-none cursor-pointer whitespace-nowrap transition-all ${
                selectedSubcategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Regions ({tours.length})
            </button>
            {categoryData.subcategories?.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border-none cursor-pointer whitespace-nowrap transition-all ${
                  selectedSubcategory === sub.slug
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-medium text-slate-700 outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. TOURS GRID */}
      <div className="max-w-7xl py-12 px-4">
        {filteredTours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-lg mx-auto">
            <p className="text-base text-slate-500 mb-4">No expeditions match your current search criteria.</p>
            <Button variant="luxury" onClick={() => { setSearchQuery(''); setSelectedSubcategory('all'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="tours-grid-modern">
            {filteredTours.map((tour, idx) => {
              const inWishlist = isInWishlist(tour.id || tour.place);

              return (
                <motion.div
                  key={tour.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <TiltCard maxTilt={6}>
                    <div className="tour-card-wrapper h-full flex flex-col">
                      <div className="tour-image-container">
                        <img src={tour.image} alt={tour.place} loading="lazy" />
                        <button
                          onClick={() => {
                            toggleWishlist(tour);
                            addToast({
                              title: inWishlist ? "Removed from Wishlist" : "Saved to Wishlist",
                              message: `${tour.place} updated.`,
                              type: "info"
                            });
                          }}
                          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                        >
                          <Heart size={18} className={inWishlist ? "fill-rose-500 text-rose-500" : ""} />
                        </button>
                        <div className="tour-meta-pill">
                          <Clock size={13} /> {tour.duration}
                        </div>
                      </div>

                      <div className="tour-content-box flex flex-col flex-1">
                        <div className="tour-location-row">
                          <span className="tour-country">
                            <MapPin size={12} className="inline mr-1" /> {tour.subcategory || 'Bespoke Tour'}
                          </span>
                          <div className="tour-rating">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span>{tour.rating || 4.9}</span>
                          </div>
                        </div>

                        <h3 className="tour-title">{tour.place}</h3>
                        <p className="tour-desc">{tour.description}</p>

                        <div className="tour-footer-row mt-auto">
                          <div className="tour-price-box">
                            <span className="tour-price-label">All-Inclusive From</span>
                            <span className="tour-price-value">{formatPrice(tour.price)}</span>
                          </div>

                          <Button
                            variant="luxury"
                            size="sm"
                            onClick={() => navigate('/booking', { state: { selectedTour: tour } })}
                          >
                            Book Now <ArrowRight size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
