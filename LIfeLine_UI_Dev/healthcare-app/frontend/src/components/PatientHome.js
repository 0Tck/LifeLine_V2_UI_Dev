import React, { useState, useEffect } from 'react';
import './PatientHome.css';

function PatientHome() {
  // Simulating data fetch from database
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API call
    const fetchPatientData = async () => {
      try {
        //const userData = JSON.parse(localStorage.getItem('user'));
        // Simulated API response with your database model
        const data = {
          firstName: "Manas",
          lastName: "Xyz",
          age: 19,
          sex: "male",
          phone: "9442342392",
          email: "gfg@gdf.com",
          bloodGroup: "O+",
          currentMedications: ["Cetirizine: Morning / Evening after meal", 
                                "Loratadine: Morning before meal", 
                                "Montek-LC: when ever you feel allergic"],
          upcomingAppointments: ["An appointment on November 8th, 2024", "Follow up after another month"],
          dateOfBirth: "2005-03-15",
          currentHealthStatus: "Mildly allergic to dust.",
        };
        setPatientData(data);
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patientData) return <div>No patient data found</div>;

  return (
    <div>
      <div className="patient-summary-card">
        <img 
          src="/api/placeholder/200/200"
          alt="Patient"
          className="patient-photo"
        />
        
        <div className="patient-details">
          <h2 className="patient-name">
            {patientData.firstName} {patientData.lastName}
          </h2>
          
          <div className="details-grid">
            <span className="detail-label">Age</span>
            <span className="detail-value">{patientData.age} years</span>

            <span className="detail-label">Sex</span>
            <span className="detail-value">{patientData.sex}</span>

            <span className="detail-label">Date of Birth</span>
            <span className="detail-value">{patientData.dateOfBirth}</span>

            <span className="detail-label">Blood Group</span>
            <span className="detail-value">{patientData.bloodGroup || 'Not specified'}</span>

            <span className="detail-label">Current Health Status</span>
            <span className="detail-value">
              <span className={`status-chip ${
                patientData.currentHealthStatus === 'Healthy' 
                  ? 'status-healthy' 
                  : 'status-attention'
              }`}>
                {patientData.currentHealthStatus}
              </span>
            </span>

            <span className="detail-label">Current Medication</span>
            <span className="detail-value">
              {patientData.currentMedications && patientData.currentMedications.length > 0 ? (
                <ul className="medication-list">
                  {patientData.currentMedications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              ) : (
                'No current medications'
              )}
            </span>

            <span className="detail-label">Upcoming Appointments</span>
            <span className="detail-value">
              {patientData.upcomingAppointments && patientData.upcomingAppointments.length > 0 ? (
                <ul className="medication-list">
                  {patientData.upcomingAppointments.map((apt, index) => (
                    <li key={index}>
                      <span className="appointment-date">{apt.date}</span> - {apt.description}
                    </li>
                  ))}
                </ul>
              ) : (
                'No upcoming appointments'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHome;