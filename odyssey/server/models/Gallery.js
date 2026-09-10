const mongoose = require('mongoose');
const GallerySchema = new mongoose.Schema({
  title: String,
  image: String
});
module.exports = mongoose.model('Gallery', GallerySchema, 'gallery');