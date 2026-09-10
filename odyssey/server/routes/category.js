// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Model for category collection

// GET /api/category/:type
router.get('/:type', async (req, res) => {
  const { type } = req.params;

  try {
    const category = await Category.findOne({ _id: type }); // "domestic" or "international"
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
