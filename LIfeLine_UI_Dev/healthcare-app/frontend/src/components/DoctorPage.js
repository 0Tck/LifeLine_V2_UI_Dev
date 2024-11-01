import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const DoctorPage = ({ handleLogout }) => {
  const navigate = useNavigate();
  
  const logout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div className="doctor-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <span className="nav-left">
            Doctor Dashboard
          </span>
          <button
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Coming Soon Content */}
      <div className="coming-soon-content">
        <h2 className="coming-soon-title">
          Coming Soon
        </h2>
        <p className="coming-soon-text">
          Doctor-specific features are currently under development and will be available soon.
        </p>
        <div className="coming-soon-badge">
          🏥 Stay tuned for updates
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;