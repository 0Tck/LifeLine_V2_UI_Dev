// models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true // Removes whitespace
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  collection: 'admin' // Explicitly set collection name
});

module.exports = mongoose.model('Admin', adminSchema);