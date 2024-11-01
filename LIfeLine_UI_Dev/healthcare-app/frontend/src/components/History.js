import React from 'react';
import { useNavigate } from 'react-router-dom';

const Diagnosis = () => {
  const patientName = "Manas";
  const navigate = useNavigate();

  const currentDiagnosis = {
    label: "Current Diagnosis",
    value: "Dust Allergy",
    date: new Date().toLocaleDateString(),
    comments: "Recommended to avoid dust exposure and take antihistamines as prescribed."
  };

  const pastDiseases = [
    { disease: "Chickenpox", date: "January 2022", comments: "Completed vaccination." },
    { disease: "Flu", date: "November 2021", comments: "Rest and hydration recommended." },
    { disease: "Asthma", date: "July 2020", comments: "Regular check-ups required." },
  ];

  const handleDiagnoseClick = () => {
    navigate('/predict');
  };

  const handleLabReportClick = () => {
    navigate('/lab-reports');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Medical History</h2>
      <h3 style={styles.subHeading}>Patient Name: {patientName}</h3>

      <div style={styles.card}>
        <h4 style={styles.cardTitle}>Current Diagnosis</h4>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableHeader}>Diagnosis</td>
              <td style={styles.tableCell}>{currentDiagnosis.value}</td>
            </tr>
            <tr>
              <td style={styles.tableHeader}>Date</td>
              <td style={styles.tableCell}>{currentDiagnosis.date}</td>
            </tr>
            <tr>
              <td style={styles.tableHeader}>Comments</td>
              <td style={styles.tableCell}>{currentDiagnosis.comments}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.card}>
        <h4 style={styles.cardTitle}>Past Diseases</h4>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Disease</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {pastDiseases.map((disease, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{disease.disease}</td>
                <td style={styles.tableCell}>{disease.date}</td>
                <td style={styles.tableCell}>{disease.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.diagnoseButton} onClick={handleDiagnoseClick}>
          Diagnose
        </button>
        <button style={styles.labReportButton} onClick={handleLabReportClick}>
          Lab Report
        </button>
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
  subHeading: {
    textAlign: 'center',
    color: '#555',
    fontSize: '1.5em',
    marginBottom: '30px',
  },
  card: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  cardTitle: {
    marginBottom: '15px',
    color: '#444',
    fontSize: '1.8em',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  diagnoseButton: {
    padding: '10px 20px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  labReportButton: {
    padding: '10px 20px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default Diagnosis;
