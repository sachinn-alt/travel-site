const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  place: String,
  date: String,
  travelers: Number
});
module.exports = mongoose.model('Booking', BookingSchema, 'booking');