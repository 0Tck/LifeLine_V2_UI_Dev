// models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  service: {  // New field to store the service name or ID
    type: String,  // You can change this to ObjectId if you have a separate Service model
    required: true,
  },
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
