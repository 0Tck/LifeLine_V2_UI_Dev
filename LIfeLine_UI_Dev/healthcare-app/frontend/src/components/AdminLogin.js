// components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim() // Trim whitespace
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting admin login with:', formData.username); // Debug log
      
      const response = await axios.post(
        'http://localhost:5000/api/admin-auth/login', 
        formData,
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000 // 5 second timeout
        }
      );
      
      // Store admin token or session
      localStorage.setItem('adminAuth', JSON.stringify({
        isAdmin: true,
        adminId: response.data.adminId
      }));

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error.response || error);
      
      let errorMessage = 'An error occurred during login.';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Could not connect to the server. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
      
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <button 
          type="submit" 
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;