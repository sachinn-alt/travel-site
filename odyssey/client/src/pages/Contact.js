import React, { useEffect, useState } from 'react';
import '../App.css';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => setContacts(data));

    fetch('http://localhost:5000/api/feedback')
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  console.log("Fetched contacts:", contacts);
  console.log("Fetched feedbacks:", feedbacks);

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setFeedbacks([data, ...feedbacks]);
        setForm({ name: '', email: '', message: '' });
      });
  };

  return (
    <div className="contact-section">
      <h2 className="contact-title">Get in Touch with Our Offices</h2>
      <div className="contact-container">
        {contacts.map((item, index) => (
          <div key={index} className="contact-card">
            <h3 className="contact-office">{item.officeName}</h3>
            <p className="contact-address">{item.address}</p>
            <p className="contact-email"><strong>Email:</strong> {item.email}</p>
            <p className="contact-website"><strong>Website:</strong> {item.website}</p>
          </div>
        ))}
      </div>

      <div className="feedback-form">
        <h2 className="contact-title">Leave Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={form.name} required
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" value={form.email} required
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea placeholder="Message" value={form.message} required
            onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      <div className="feedback-display">
        <h3>What People Say</h3>
        {feedbacks.map((fb, idx) => (
          <div key={idx} className="feedback-card">
            <p><strong>{fb.name}</strong> ({new Date(fb.date).toLocaleDateString()})</p>
            <p>{fb.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
