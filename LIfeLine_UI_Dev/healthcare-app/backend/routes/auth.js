// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    // Prevent admin registration through this route
    if (userType === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed through this route.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with pending status
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
      status: 'pending' // All new registrations start as pending
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful. Waiting for admin approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Prevent admin login through this route
    if (userType === 'admin') {
      return res.status(403).json({ message: 'Please use admin login page.' });
    }

    // Find user
    const user = await User.findOne({ email, userType });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if user is approved
    if (user.status !== 'approved') {
      return res.status(403).json({ 
        message: user.status === 'pending' 
          ? 'Your registration is pending approval.' 
          : 'Your account has been rejected.'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Send user data (excluding password)
    const userData = user.toObject();
    delete userData.password;
    
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.' });
  }
});

module.exports = router;