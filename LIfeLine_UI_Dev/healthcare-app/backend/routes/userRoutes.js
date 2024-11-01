const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as needed

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  const { firstName, lastName, age, sex, phone, email, password, userType, hospital, specialty } = req.body;

  try {
    // Check if required fields are provided
    if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      age,
      sex,
      phone,
      email,
      password: hashedPassword,
      userType,
      hospital,
      specialty,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

module.exports = router;
