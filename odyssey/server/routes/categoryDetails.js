const express = require('express');
const router = express.Router();
const CategoryDetails = require('../models/CategoryDetails');

// GET /api/category-details
router.get('/', async (req, res) => {
  try {
    const details = await CategoryDetails.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load category details' });
  }
});

// GET /api/category-details/:type (domestic or international)
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const details = await CategoryDetails.find({ type });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load category details' });
  }
});

module.exports = router;
