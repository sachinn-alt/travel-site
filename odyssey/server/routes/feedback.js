const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ date: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post feedback
router.post('/', async (req, res) => {
  const newFeedback = new Feedback(req.body);
  try {
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
