import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [formType, setFormType] = useState("appointment");
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    problem: '',
    doctorType: '',
    date: '',
    address: '',
    test: '',
    medicines: []
  });
  const [orders, setOrders] = useState([]);

  const handleFormTypeChange = (e) => setFormType(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings/create', { ...formData, type: formType });
      alert("Booking saved successfully!");
      setFormData({
        name: '', age: '', sex: '', problem: '', doctorType: '', date: '', address: '', test: '', medicines: []
      });
    } catch (error) {
      alert("Error saving booking");
    }
  };

  const handleShowOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/view');
      setOrders(response.data);
    } catch (error) {
      alert("Error fetching orders");
    }
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking Appointments</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          Booking Type:
          <select onChange={handleFormTypeChange} value={formType} style={styles.select}>
            <option value="appointment">Appointment</option>
            <option value="labTest">Lab Test</option>
            <option value="medicine">Medicine Ordering</option>
          </select>
        </label>

        {/* Common Fields */}
        <label style={styles.label}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Sex:
          <select name="sex" value={formData.sex} onChange={handleInputChange} required style={styles.select}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={styles.label}>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={styles.input} />
        </label>

        {/* Conditional Fields */}
        {formType === "appointment" && (
          <>
            <label style={styles.label}>
              Problem Description:
              <textarea name="problem" value={formData.problem} onChange={handleInputChange} style={styles.textarea} />
            </label>
            <label style={styles.label}>
              Doctor Type:
              <select name="doctorType" value={formData.doctorType} onChange={handleInputChange} style={styles.select}>
                <option value="">Select</option>
                <option value="General Physician">General Physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </label>
          </>
        )}

        {formType === "labTest" && (
          <>
            <label style={styles.label}>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Test:
              <select name="test" value={formData.test} onChange={handleInputChange} style={styles.select}>
                <option value="">Select Test</option>
                <option value="Blood Test">Blood Test</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI">MRI</option>
              </select>
            </label>
          </>
        )}

        {formType === "medicine" && (
          <label style={styles.label}>
            Medicines (comma-separated):
            <input type="text" name="medicines" value={formData.medicines} onChange={handleInputChange} style={styles.input} />
          </label>
        )}

        <button type="button" onClick={handleBookingSubmit} style={styles.button}>
          Submit
        </button>
        <button type="button" onClick={handleShowOrders} style={styles.button}>
          View Your Orders
        </button>
      </form>

      {/* Display Orders */}
      <div style={styles.ordersContainer}>
        <h3>Your Orders</h3>
        {orders.map((order, index) => (
          <div key={index} style={styles.order}>
            <p>Type: {order.type}</p>
            <p>Name: {order.name}</p>
            <p>Age: {order.age}</p>
            <p>Sex: {order.sex}</p>
            <p>Date: {order.date}</p>
            {order.problem && <p>Problem: {order.problem}</p>}
            {order.doctorType && <p>Doctor Type: {order.doctorType}</p>}
            {order.address && <p>Address: {order.address}</p>}
            {order.test && <p>Test: {order.test}</p>}
            {order.medicines && <p>Medicines: {order.medicines.join(", ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS styles at the bottom of the file
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    cursor: 'pointer',
  },
  ordersContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  order: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
};

export default Booking;
