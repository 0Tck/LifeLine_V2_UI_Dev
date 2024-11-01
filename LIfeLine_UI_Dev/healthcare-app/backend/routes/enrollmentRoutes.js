// routes/enrollmentRoutes.js
const express = require('express');
const Enrollment = require('../models/Enrollment');
const router = express.Router();

// Route to handle enrollment submission
router.post('/enroll-now', async (req, res) => {
  try {
    const enrollmentData = new Enrollment(req.body);
    await enrollmentData.save();
    res.status(201).json({ message: 'Enrollment successful!', data: enrollmentData });
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling', error: error.message });
  }
});

// Route to retrieve existing enrollments
router.get('/view-enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
});

module.exports = router;
