// scripts/setupAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminExists = await Admin.findOne({ username: 'admin@gmail.com' });
    if (adminExists) {
      console.log('Admin already exists. Updating password...');
      // Update admin password
      const hashedPassword = await bcrypt.hash('admin123', 10); // Change 'admin123' to your desired password
      await Admin.findOneAndUpdate(
        { username: 'admin@gmail.com' },
        { password: hashedPassword }
      );
      console.log('Admin password updated successfully');
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('admin123', 10); // Change 'admin123' to your desired password
      const newAdmin = new Admin({
        username: 'admin@gmail.com',
        password: hashedPassword
      });
      await newAdmin.save();
      console.log('New admin created successfully');
    }

    // Verify admin exists
    const admin = await Admin.findOne({ username: 'admin@gmail.com' });
    console.log('Admin account verified:', admin.username);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

setupAdmin();