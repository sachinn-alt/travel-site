import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Star,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input, Textarea } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useToast } from '../components/ui/toast';
import { fallbackContactData } from '../data/fallbackData';

const Contact = () => {
  const { addToast } = useToast();
  const [offices, setOffices] = useState(fallbackContactData.offices);
  const [feedbacks, setFeedbacks] = useState(fallbackContactData.feedbacks);
  const [openFaq, setOpenFaq] = useState(null);

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    tour: 'Amalfi Coast & Capri Yacht Odyssey',
    rating: 5,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch contacts from backend
    fetch('http://localhost:5000/api/contact')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) setOffices(data);
      })
      .catch(() => {});

    // Fetch feedbacks
    fetch('http://localhost:5000/api/feedback')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) setFeedbacks((prev) => [...data, ...prev]);
      })
      .catch(() => {});
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newFeedback = {
      ...reviewForm,
      date: new Date().toISOString()
    };

    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      });
    } catch {}

    setFeedbacks((prev) => [newFeedback, ...prev]);
    setIsSubmitting(false);
    setReviewForm({ name: '', email: '', tour: 'Amalfi Coast & Capri Yacht Odyssey', rating: 5, message: '' });

    addToast({
      title: "Review Published",
      message: "Thank you for sharing your experience with the Odyssey travel community!",
      type: "success"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gold" className="mb-2">Global Concierge</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Connect With Our Ateliers
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Our private client managers across Europe, the Middle East, and South Asia are on hand to curate your next expedition.
          </p>
        </div>

        {/* Global Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {offices.map((office, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 block">
                  {office.city || "Regional Office"}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {office.officeName}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex items-start gap-1.5">
                  <MapPin size={14} className="shrink-0 text-slate-400 mt-0.5" />
                  <span>{office.address}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors"
                >
                  <Mail size={13} className="text-amber-500" />
                  <span className="truncate">{office.email}</span>
                </a>
                <a
                  href={`tel:${office.phone || '+911149823300'}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors"
                >
                  <Phone size={13} className="text-amber-500" />
                  <span>{office.phone || "+91 11 4982 3300"}</span>
                </a>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={13} />
                  <span>{office.hours || "Mon - Fri: 9am - 6pm"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Split Section: Leave Review & Reviews Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Review Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                Guest Impressions
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Share Your Expedition</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your feedback helps our master curators maintain peerless excellence.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Full Name
                </label>
                <Input
                  placeholder="e.g. Maya Krishnan"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email (Kept confidential)
                </label>
                <Input
                  type="email"
                  placeholder="maya@example.com"
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Voyage Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="bg-transparent border-none cursor-pointer p-1 text-2xl transition-transform hover:scale-125"
                    >
                      <Star
                        size={24}
                        className={star <= reviewForm.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 font-bold ml-2">
                    {reviewForm.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Thoughts & Reflections
                </label>
                <Textarea
                  placeholder="What made this voyage extraordinary for you?"
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <Button
                variant="luxury"
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-bold shadow-glow"
              >
                <Send size={16} /> {isSubmitting ? "Submitting..." : "Publish Guest Review"}
              </Button>
            </form>
          </div>

          {/* Feedback Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                    Live Community Stream
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">What Travelers Say</h3>
                </div>
                <Badge variant="gold">4.96 ★ Average</Badge>
              </div>

              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
                {feedbacks.map((fb, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                          {fb.name ? fb.name[0] : 'G'}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 m-0">{fb.name}</h4>
                          <span className="text-[11px] text-slate-400">
                            {fb.date ? new Date(fb.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Guest'}
                            {fb.tour ? ` • ${fb.tour}` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(fb.rating || 5)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed m-0 mt-2">
                      "{fb.message}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto" id="faq">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
              Curator Advisory
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {fallbackContactData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center text-sm md:text-base border-none bg-transparent cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-600 text-xl font-black">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
