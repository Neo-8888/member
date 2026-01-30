const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/policies - return policies for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user.id }).select('-__v');
    res.json({ policies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;