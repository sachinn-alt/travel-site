// client/src/pages/Gallery.js
import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((item, index) => (
            <div key={index} className="border p-2 shadow">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-2 text-lg font-semibold text-center">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
