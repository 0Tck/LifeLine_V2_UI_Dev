// models/User.js
const mongoose = require('mongoose');

// Sub-schema for appointments
const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purpose: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String },
  followUp: { type: Date }
});

// Sub-schema for medical history entries
const medicalHistorySchema = new mongoose.Schema({
  condition: { type: String, required: true },
  diagnosedDate: { type: Date },
  treatment: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' }
});

// Sub-schema for medications
const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true }
});

// Sub-schema for trustees/emergency contacts
const trusteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  isEmergencyContact: { type: Boolean, default: false }
});

// Sub-schema for diagnosis
const diagnosisSchema = new mongoose.Schema({
  condition: { type: String, required: true },
  diagnosedDate: { type: Date, required: true },
  diagnosedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptoms: [String],
  notes: { type: String },
  status: { type: String, enum: ['active', 'monitoring', 'resolved'], default: 'active' }
});

// Main User Schema
const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  sex: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, // e.g., 'patient', 'doctor'
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  
  // Medical Professional Specific Fields
  hospital: { type: String },
  specialty: { type: String },
  
  // Patient Specific Fields
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
  },
  
  // Health Information
  medicalHistory: [medicalHistorySchema],
  currentMedications: [medicationSchema],
  diagnoses: [diagnosisSchema],
  
  // Appointments
  previousAppointments: [appointmentSchema],
  upcomingAppointments: [appointmentSchema],
  
  // Services Subscribed/Available
  services: [{
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  }],
  
  // Emergency Contacts and Trustees
  trustees: [trusteeSchema],
  
  // Meta Information
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ userType: 1 });
userSchema.index({ 'upcomingAppointments.date': 1 });

module.exports = mongoose.model('User', userSchema);