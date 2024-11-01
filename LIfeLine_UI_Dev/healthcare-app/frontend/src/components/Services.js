// Services.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      category: "General Health Services",
      providers: [
        { type: "Government", name: "Primary Health Centers", description: "Free health check-ups, vaccinations, and basic treatment services for all citizens." },
        { type: "Private", name: "Family Doctors & Clinics", description: "Basic consultations, check-ups, and preventive care offered by private clinics and general practitioners." }
      ]
    },
    {
      category: "Specialist Consultations",
      providers: [
        { type: "Government", name: "Public Hospitals", description: "Access to specialized doctors in fields such as cardiology, orthopedics, neurology, and more at government hospitals." },
        { type: "Private", name: "Specialty Clinics", description: "Appointments with specialist doctors in private facilities for personalized care and quicker access to experts." }
      ]
    },
    {
      category: "Emergency Services",
      providers: [
        { type: "Government", name: "Ambulance Services", description: "Government-operated 24/7 ambulance services for emergencies, available through public health departments." },
        { type: "Private", name: "Private Ambulances & ERs", description: "Immediate response services from private hospitals and ambulances with advanced life support equipment." }
      ]
    },
    {
      category: "Mental Health Support",
      providers: [
        { type: "Government", name: "Mental Health Clinics", description: "Free counseling and mental health support available in government hospitals and centers." },
        { type: "Private", name: "Counseling Services", description: "Paid services by private mental health professionals, including therapy and counseling for various mental health needs." }
      ]
    },
    {
      category: "Maternal & Child Health Services",
      providers: [
        { type: "Government", name: "Anganwadi & Health Centers", description: "Mother and child care services, including nutrition and immunization, provided free of charge." },
        { type: "Private", name: "Private Maternity Hospitals", description: "Specialized maternity care for childbirth and postpartum support available in private hospitals." }
      ]
    },
    {
      category: "Public Health Programs",
      providers: [
        { type: "Government", name: "Vaccination Drives", description: "National immunization programs offering free vaccinations for children and adults." },
        { type: "Government", name: "Tuberculosis & Malaria Programs", description: "Free screening, diagnosis, and treatment for diseases like TB and malaria at public health centers." }
      ]
    },
    {
      category: "Diagnostic Services",
      providers: [
        { type: "Government", name: "Public Diagnostic Centers", description: "Low-cost diagnostic services for blood tests, X-rays, and more in government facilities." },
        { type: "Private", name: "Private Labs", description: "Paid diagnostic services including MRI, CT scans, and specialized lab tests with faster results." }
      ]
    },
    {
      category: "Pharmacy Services",
      providers: [
        { type: "Government", name: "Jan Aushadhi Centers", description: "Affordable generic medicines provided by government-operated pharmacies." },
        { type: "Private", name: "Private Pharmacies", description: "Wide range of branded and generic medicines available for purchase in private pharmacies." }
      ]
    },
  ];

  const handleEnroll = (serviceName) => {
    navigate('/enrollment', { state: { serviceName } }); // Pass the service name in state
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Services</h2>
      <p style={styles.description}>Explore our healthcare services and specialties provided by both private and government agencies.</p>
      
      {services.map((service, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.category}>{service.category}</h3>
          {service.providers.map((provider, subIndex) => (
            <div key={subIndex} style={styles.provider}>
              <h4 style={styles.providerType}>{provider.type} - {provider.name}</h4>
              <p style={styles.providerDescription}>{provider.description}</p>
              <button onClick={() => handleEnroll(provider.name)} style={styles.enrollButton}>Enroll</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f5f7fa',
    borderRadius: '10px',
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
  card: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  category: {
    fontSize: '1.8em',
    color: '#444',
    marginBottom: '10px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  provider: {
    margin: '10px 0',
  },
  providerType: {
    fontSize: '1.2em',
    color: '#333',
    fontWeight: 'bold',
  },
  providerDescription: {
    fontSize: '1em',
    color: '#555',
    marginTop: '5px',
  },
};

export default Services;
