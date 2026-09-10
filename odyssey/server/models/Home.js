const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  type: String,
  hero: {
    title: String,
    subtitle: String,
    image: String
  },
  highlights: [
    {
      icon: String,
      title: String
    }
  ],
  featuredTours: [
    {
      place: String,
      image: String,
      link: String
    }
  ]
});

module.exports = mongoose.model('Home', HomeSchema, 'home');
