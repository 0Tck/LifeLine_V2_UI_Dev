// LabReports.js
import React from 'react';

const LabReports = () => {
  const labReports = [
    { name: "Blood Test Report", date: "2024-01-20", link: "/files/blood.pdf" },
    { name: "X-Ray Report", date: "2024-02-15", link: "/files/xray.pdf" },
    { name: "MRI Scan Report", date: "2024-03-10", link: "/files/mri.pdf" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Lab Reports</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Report Name</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {labReports.map((report, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{report.name}</td>
              <td style={styles.tableCell}>{report.date}</td>
              <td style={styles.tableCell}>
                <a href={report.link} target="_blank" rel="noopener noreferrer">
                  View Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#eef2f3',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2.5em',
    marginBottom: '20px',
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
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px',
  },
};

export default LabReports;
