const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  type: String, // domestic or international
  name: String,
  image: String
});
module.exports = mongoose.model('Category', CategorySchema, 'category');