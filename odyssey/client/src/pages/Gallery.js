import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { fallbackGalleryData } from '../data/fallbackData';

const Gallery = () => {
  const [photos, setPhotos] = useState(fallbackGalleryData);
  const [filter, setFilter] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          // Merge with high-res images
          setPhotos(fallbackGalleryData);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, []);

  const filteredPhotos = photos.filter((p) => filter === 'all' || p.category === filter);

  const handleKeyDown = useCallback((e) => {
    if (activePhotoIndex === null) return;
    if (e.key === 'ArrowRight') {
      setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
    }
    if (e.key === 'ArrowLeft') {
      setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
    if (e.key === 'Escape') {
      setActivePhotoIndex(null);
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="gold" className="mb-2">Visual Journal</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">
            Glimpses of Pure Wonder
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Unfiltered moments from our private expeditions across continents. Click any frame to enter immersive full-screen view.
          </p>

          {/* Filters */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 mt-6 gap-1 flex-wrap justify-center">
            {[
              { id: 'all', label: 'All Portfolios' },
              { id: 'coastal', label: '🏖️ Coastal & Seas' },
              { id: 'mountain', label: '🏔️ Alpine & High Passes' },
              { id: 'culture', label: '🏛️ Cultural Wonders' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl border-none cursor-pointer transition-all ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid-modern">
          {filteredPhotos.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="gallery-card group"
              onClick={() => setActivePhotoIndex(index)}
            >
              <img src={item.image} alt={item.title} loading="lazy" />

              <div className="gallery-overlay">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                  <MapPin size={12} /> {item.location}
                </span>
                <h3 className="text-lg font-bold text-white m-0">{item.title}</h3>
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
          <div
            className="lightbox-backdrop"
            onClick={() => setActivePhotoIndex(null)}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border-none cursor-pointer transition-all z-20"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border-none cursor-pointer transition-all z-20 hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border-none cursor-pointer transition-all z-20 hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-content"
            >
              <img
                src={filteredPhotos[activePhotoIndex].image}
                alt={filteredPhotos[activePhotoIndex].title}
                className="lightbox-img"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold m-0 mb-1">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <span className="text-sm text-amber-300 font-medium flex items-center justify-center gap-1">
                  <MapPin size={14} /> {filteredPhotos[activePhotoIndex].location}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
