import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('odyssey_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('odyssey_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (tour) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => (item.id || item.place) === (tour.id || tour.place));
      if (exists) {
        return prev.filter((item) => (item.id || item.place) !== (tour.id || tour.place));
      } else {
        return [...prev, tour];
      }
    });
  };

  const isInWishlist = (tourIdOrPlace) => {
    return wishlist.some((item) => (item.id || item.place) === tourIdOrPlace);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
