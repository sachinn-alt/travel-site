const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  officeName: String,
  email: String,
  address: String,
  website: String
});
module.exports = mongoose.model('Contact', ContactSchema, 'contact');
