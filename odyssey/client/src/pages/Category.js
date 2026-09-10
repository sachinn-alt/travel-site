import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Categories = () => {
  const { type } = useParams(); // "domestic" or "international"
  const [category, setCategory] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/category/${type}`)
      .then(res => res.json())
      .then(data => setCategory(data));
  }, [type]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/category_details/${type}`)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, [type]);

  return (
    <>
      {/* HERO IMAGE */}
      {category && (
        <div
          className="relative h-[300px] bg-cover bg-center flex items-center justify-center mb-6"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold">
              {category.category} Tours
            </h1>
          </div>
        </div>
      )}

      {/* SUBCATEGORIES */}
      {category?.subcategories?.map((sub, idx) => (
        <div key={idx} className="mb-12 px-6">
          <h2 className="text-2xl font-semibold mb-4">{sub.name} Adventures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {details
              .filter(tour => tour.subcategory === sub.slug)
              .map((tour, i) => (
                <div key={i} className="border p-4 rounded-lg shadow hover:shadow-md bg-white">
                  <img src={tour.image} alt={tour.place} className="w-full h-48 object-cover rounded" />
                  <h3 className="text-lg font-bold mt-2">{tour.place}</h3>
                  <p className="text-sm text-gray-600">{tour.description}</p>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span>{tour.duration}</span>
                    <span className="text-green-600 font-semibold">₹{tour.price}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
