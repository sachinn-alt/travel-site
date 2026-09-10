const express = require('express');
const router = express.Router();
const About = require('../models/About');

router.get('/', async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load about info' });
  }
});

module.exports = router;
