// Medication.js
import React from 'react';

const Medication = () => {
  const currentMedications = [
    { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", purpose: "Dust Allergy", comments: "Take in the evening to reduce drowsiness." },
    { name: "Albuterol Inhaler", dosage: "90 mcg", frequency: "As needed", purpose: "Asthma", comments: "Use before exercise or when experiencing breathing difficulties." },
  ];

  const pastMedications = [
    { name: "Oseltamivir", dosage: "75mg", frequency: "Twice daily for 5 days", purpose: "Flu", comments: "Completed course in Nov 2021." },
    { name: "Paracetamol", dosage: "500mg", frequency: "As needed", purpose: "Fever (Chickenpox)", comments: "Used for symptom relief during Jan 2022." },
  ];

  const supplements = [
    { name: "Vitamin C", dosage: "500mg", frequency: "Once daily", comments: "Boosts immune system, especially helpful during flu season." },
    { name: "Magnesium", dosage: "250mg", frequency: "Once daily", comments: "Supports lung function, beneficial for asthma." },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Medication Management</h2>
      <p style={styles.description}>Track and manage your prescriptions and medications.</p>

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Current Medications</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Medication</th>
              <th style={styles.tableHeader}>Dosage</th>
              <th style={styles.tableHeader}>Frequency</th>
              <th style={styles.tableHeader}>Purpose</th>
              <th style={styles.tableHeader}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentMedications.map((medication, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{medication.name}</td>
                <td style={styles.tableCell}>{medication.dosage}</td>
                <td style={styles.tableCell}>{medication.frequency}</td>
                <td style={styles.tableCell}>{medication.purpose}</td>
                <td style={styles.tableCell}>{medication.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Past Medications</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Medication</th>
              <th style={styles.tableHeader}>Dosage</th>
              <th style={styles.tableHeader}>Frequency</th>
              <th style={styles.tableHeader}>Purpose</th>
              <th style={styles.tableHeader}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {pastMedications.map((medication, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{medication.name}</td>
                <td style={styles.tableCell}>{medication.dosage}</td>
                <td style={styles.tableCell}>{medication.frequency}</td>
                <td style={styles.tableCell}>{medication.purpose}</td>
                <td style={styles.tableCell}>{medication.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Supplements</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Supplement</th>
              <th style={styles.tableHeader}>Dosage</th>
              <th style={styles.tableHeader}>Frequency</th>
              <th style={styles.tableHeader}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {supplements.map((supplement, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{supplement.name}</td>
                <td style={styles.tableCell}>{supplement.dosage}</td>
                <td style={styles.tableCell}>{supplement.frequency}</td>
                <td style={styles.tableCell}>{supplement.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#eef2f3',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2.5em',
    marginBottom: '10px',
  },
  description: {
    textAlign: 'center',
    color: '#555',
    fontSize: '1.2em',
    marginBottom: '30px',
  },
  section: {
    margin: '20px 0',
  },
  subHeading: {
    fontSize: '1.8em',
    color: '#444',
    marginBottom: '15px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px',
    color: '#555',
    backgroundColor: '#fafafa',
  },
};

export default Medication;
