const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  sex: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, // e.g., 'patient', 'doctor'
  hospital: { type: String },
  specialty: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
