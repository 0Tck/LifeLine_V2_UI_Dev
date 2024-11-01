// App.js
import React, { useState, useEffect } from 'react';  // Add useState and useEffect here
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Update this to match your component's name
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import PatientNav from './components/PatientNav';
import PatientHome from './components/PatientHome';
import DoctorPage from './components/DoctorPage';
import Booking from './components/Booking';
import AvaDoctors from './components/AvaDoctors';
import Diagnosis from './components/Diagnosis';
import History from './components/History';
import Medication from './components/Medication';
import Services from './components/Services';
import Predict from './components/Predict';
import LabReports from './components/LabReports';
import EnrollmentForm from './components/EnrollmentForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      {user ? (
        user.userType === 'patient' ? (
          <PatientNav username={user.firstName} handleLogout={handleLogout} />
        ) : (
          <DoctorPage handleLogout={handleLogout} />
        )
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/patient/home" element={<PatientHome />} />
        <Route path="/doctor" element={<DoctorPage />} />

        <Route path="/available-doctors" element={<AvaDoctors />} />
        <Route path="/lab-reports" element={<LabReports />} />
        <Route path="/enrollment" element={<EnrollmentForm />} />
        <Route path="/predict" element={<Predict />} />  
        <Route path="/booking" element={<Booking />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/history" element={<History />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
