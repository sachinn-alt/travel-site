require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("Connecting to MongoDB URL:", process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/category', require('./routes/category'));
app.use('/api/category-details', require('./routes/categoryDetails'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/about', require('./routes/about'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/home', require('./routes/home'));


app.get('/', (req, res) => res.send('Odyssey Travel API Running'));
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

