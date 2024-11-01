// routes/admin.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all pending registrations
router.get('/pending-users', async (req, res) => {
  try {
    const pendingUsers = await User.find({ 
      status: 'pending',
      userType: { $ne: 'admin' } 
    }).select('-password'); // Exclude password from results
    
    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending users.' });
  }
});

// Get all users (for admin dashboard)
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({ 
      userType: { $ne: 'admin' } 
    }).select('-password');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Approve or reject user
router.put('/update-status/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ 
      message: `User ${status} successfully.`,
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status.' });
  }
});

module.exports = router;