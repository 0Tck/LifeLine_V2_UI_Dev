import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <nav>
      <h1>LifeLine.</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin/login">Admin Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
