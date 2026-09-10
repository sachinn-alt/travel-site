import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { fallbackAboutData } from '../data/fallbackData';

const About = () => {
  const [aboutData, setAboutData] = useState(fallbackAboutData);

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          // Merge API fields with rich data
          setAboutData((prev) => ({
            ...prev,
            heading: data[0].heading || prev.heading,
            subheading: data[0].subheading || prev.subheading,
            description: data[0].description || prev.description,
            mission: data[0].mission || prev.mission,
            vision: data[0].vision || prev.vision
          }));
        }
      })
      .catch(() => {
        // Fallback active
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl px-4">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-3">Our Atelier & Philosophy</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            {aboutData.heading}
          </h1>
          <p className="text-lg md:text-xl font-medium text-amber-600 mb-6">
            {aboutData.subheading}
          </p>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            {aboutData.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {aboutData.stats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-1 text-amber-500">
                {st.number}
              </div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision Dual Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
              <Compass size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Sacred Mission</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {aboutData.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-950/20 text-slate-950 flex items-center justify-center mb-6">
              <Sparkles size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-950 mb-3">Our 2030 Vision</h2>
            <p className="text-slate-950/85 leading-relaxed text-sm md:text-base font-medium">
              {aboutData.vision}
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">
              Our Pillars
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              The Guiding Tenets of Odyssey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.coreValues.map((val, i) => (
              <SpotlightCard key={i} spotlightColor="rgba(245, 158, 11, 0.2)">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 font-bold">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed m-0">{val.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Master Curators Team */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">
              The Minds Behind Your Journeys
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Meet Our Regional Curators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.team.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter saturate-[0.9] hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mb-1">
                    <MapPin size={13} /> {member.location}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-0.5">{member.name}</h3>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 italic border-l-2 border-amber-400 pl-3 m-0">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
