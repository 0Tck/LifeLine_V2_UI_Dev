const express = require('express');
const Booking = require('../models/Booking'); // Import the Booking model

const router = express.Router();

// Booking creation route
router.post('/create', async (req, res) => {
  const bookingData = req.body;

  try {
    const newBooking = new Booking(bookingData);
    await newBooking.save(); // Save the booking to the database

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Viewing all bookings route
router.get('/view', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Retrieve all bookings from the database
    res.status(200).json(bookings); // Send the bookings as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

module.exports = router;
