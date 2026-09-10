const express = require('express');
const router = express.Router();
const CategoryDetails = require('../models/CategoryDetails');

router.get('/', async (req, res) => {
  try {
    const details = await CategoryDetails.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load category details' });
  }
});

module.exports = router;
