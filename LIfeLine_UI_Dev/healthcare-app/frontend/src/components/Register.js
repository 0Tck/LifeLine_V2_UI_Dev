// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Register() {
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    hospital: '',
    specialty: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      // Updated API endpoint
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        userType,
      });
      
      alert(response.data.message);
      // Clear form after successful registration
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        sex: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        hospital: '',
        specialty: ''
      });
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  // Rest of the component remains the same
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Sex:</label>
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        {userType === 'doctor' && (
          <>
            <div>
              <label>Hospital:</label>
              <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required />
            </div>
            <div>
              <label>Specialty:</label>
              <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required />
            </div>
          </>
        )}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;