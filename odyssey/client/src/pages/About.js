import React, { useEffect, useState } from 'react';

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => setAbout(data[0])); // Use first object
  }, []);

  if (!about) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="about-container">
      <h1 className="about-heading">{about.heading}</h1>
      <h2 className="about-subheading">{about.subheading}</h2>

      <h3 className="about-description">{about.description}</h3>

      <div className="about-card">
        <h2>Our Mission</h2>
        <h3>{about.mission}</h3>
      </div>

      <div className="about-card">
        <h2>Our Vision</h2>
        <h3>{about.vision}</h3>
      </div>

      <div className="about-card">
        <h2>Core Values</h2>
        <h3>{about.coreValuesNote}</h3>
        <ul className="list-disc list-inside">
          {about.coreValues?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="about-card">
        <h2>Our Team</h2>
        <h3>{about.teamNote}</h3>
      </div>
    </div>
  );
};

export default About;
