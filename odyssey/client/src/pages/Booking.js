import React, { useState } from 'react';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

const Booking = () => {
  const [form, setForm] = useState({ name: '', email: '', place: '', date: '', travelers: 1 });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Booking successful!');
  };

  return (
    <>
      <div className="booking-form">
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="place" placeholder="Place" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="number" name="travelers" placeholder="Travelers" min="1" onChange={handleChange} required />
      <button type="submit">Book Now</button>
    </form>
  </div>
    </>
  );
};
export default Booking;