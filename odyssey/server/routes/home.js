const express = require('express');
const router = express.Router();
const Home = require('../models/Home');

router.get('/', async (req, res) => {
  try {
    const data = await Home.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch home data' });
  }
});

module.exports = router;
