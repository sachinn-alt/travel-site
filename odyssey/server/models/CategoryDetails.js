const mongoose = require('mongoose');
const CategoryDetailsSchema = new mongoose.Schema({
  type: String, // domestic or international
  cat: String, // mountain or sea
  place: String,
  duration: String,
  price: Number,
  description: String,
  image: String
});
module.exports = mongoose.model('CategoryDetails', CategoryDetailsSchema, 'category_details');