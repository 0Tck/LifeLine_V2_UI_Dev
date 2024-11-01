import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientNav.css';

const PatientNav = ({ username, handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        {/* Left side - Username */}
        <div className="nav-left">
          Welcome, {username}
        </div>

        {/* Right side - Navigation Links */}
        <div className="nav-right">
          <Link to="/booking" className="nav-link">Book</Link>
          <Link to="/diagnosis" className="nav-link">Diagnosis</Link>
          <Link to="/history" className="nav-link">History</Link>
          <Link to="/medication" className="nav-link">Medication</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default PatientNav;