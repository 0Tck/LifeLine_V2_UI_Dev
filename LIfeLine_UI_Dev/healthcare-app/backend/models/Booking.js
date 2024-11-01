const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
    required: true,
  },
  problem: {
    type: String,
    required: false,
  },
  doctorType: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  test: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true, // Type of booking: appointment, lab test, medicine
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
