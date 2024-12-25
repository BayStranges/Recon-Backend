const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // auth middleware'ini dahil et
const User = require('../models/User'); // User modelini dahil et

// Kullanıcı profilini al
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
