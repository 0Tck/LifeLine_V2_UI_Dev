import React, { useState } from 'react';
import '../Home.css'; // Ensure you have the CSS file linked

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="home-container">
      <h2>Welcome to LifeLine</h2>
      
      {/* First Section: About the App and Services */}
      <section className="about-section">
        <h3>About Our Application</h3>
        <p>
          Our Healthcare App provides a range of services to help you manage your health 
          effectively. From booking appointments to accessing medical information, we aim 
          to enhance your healthcare experience. 
        </p>
        <h4>Services Provided:</h4>
        <ul>
          <li>Online Consultations</li>
          <li>Prescription Management</li>
          <li>Health Tracking</li>
          <li>Emergency Services</li>
          <li>Health Tips and Resources</li>
        </ul>
      </section>

      {/* Second Section: Contact Us */}
      <section className="contact-section">
        <h3>Contact Us</h3>
        <div className="contact-container">
          <div className="contact-details">
            <h4>Our Address</h4>
            <p>123 Health St, Wellness City, HC 12345</p>
            <h4>Details</h4>
            <p>If you have any questions or need assistance, feel free to reach out to us!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
