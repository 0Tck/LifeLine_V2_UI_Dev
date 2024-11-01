// routes/adminAuth.js
const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username); // Debug log

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('No admin found with username:', username); // Debug log
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('Admin found, verifying password...'); // Debug log

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    res.json({ 
      message: 'Admin login successful!',
      adminId: admin._id
    });
  } catch (error) {
    console.error('Detailed admin login error:', error); // Enhanced error logging
    res.status(500).json({ message: 'Error logging in.' });
  }
});

module.exports = router;