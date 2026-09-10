const mongoose = require('mongoose');
const AboutSchema = new mongoose.Schema({
  heading: String,
  content: String
});
module.exports = mongoose.model('About', AboutSchema, 'about');