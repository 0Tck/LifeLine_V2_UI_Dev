import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EnrollmentForm = () => {
  const location = useLocation();
  const { serviceName } = location.state || { serviceName: '' }; // Get the service name
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    income: '',
    service: serviceName,
  });

  const [enrollments, setEnrollments] = useState([]); // State to hold enrollments

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/enroll/enroll-now', { // Corrected endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Response:', data);
      setFormData({
        name: '',
        age: '',
        sex: '',
        income: '',
        service: serviceName,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleViewEnrollments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enroll/view-enrollments'); // Corrected endpoint
      const enrollmentsData = await response.json();
      setEnrollments(enrollmentsData); // Set state with the fetched enrollments
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enrollment Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Sex:
          <select name="sex" value={formData.sex} onChange={handleChange} required style={styles.input}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={styles.label}>
          Income:
          <input type="number" name="income" value={formData.income} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Service Name:
        <input type="text" name="service" value={formData.service} readOnly style={styles.input} />
        </label>

        <button type="submit" style={styles.button}>Enroll</button>
      </form>
      <button onClick={handleViewEnrollments} style={styles.viewButton}>View Existing Enrollments</button>

      {/* Displaying existing enrollments */}
      <div style={styles.enrollmentList}>
        <h3>Existing Enrollments:</h3>
        <ul>
          {enrollments.map((enrollment, index) => (
            <li key={index}>
              {`Name: ${enrollment.name}, Age: ${enrollment.age}, Sex: ${enrollment.sex}, Income: ${enrollment.income}, Service: ${enrollment.service}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styles...
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f5f7fa',
    borderRadius: '10px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  enrollmentList: {
    marginTop: '20px',
  },
};

export default EnrollmentForm;
