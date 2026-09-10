const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});

module.exports = router;
