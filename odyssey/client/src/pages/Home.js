import React, { useEffect, useState } from 'react';

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/home')
      .then(res => res.json())
      .then(data => setHomeData(data[0]))
      .catch(err => console.error('Home fetch error:', err));
  }, []);

  if (!homeData) return <p>Loading...</p>;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <img src={homeData.hero.image} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>{homeData.hero.title}</h1>
          <p>{homeData.hero.subtitle}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights">
        {homeData.highlights.map((item, i) => (
          <div key={i} className="highlight-card">
            <span className="icon">{item.icon}</span>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Featured Tours */}
      <div className="featured-tours">
        <h2>Featured Tours</h2>
        <div className="tours-grid">
          {homeData.featuredTours.map((tour, i) => (
            <a href={tour.link} key={i} className="tour-card">
              <img src={tour.image} alt={tour.place} />
              <div className="tour-name">{tour.place}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
