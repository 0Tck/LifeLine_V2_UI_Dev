import React, { useState } from 'react';

const Predict = () => {
  const [prompt, setPrompt] = useState('');
  const [prediction, setPrediction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPrediction([]);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data.response);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Diagnose</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Please describe your symptoms..."
          style={styles.textarea}
          required
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          style={styles.button}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {prediction.length > 0 && (
        <div style={styles.results}>
          <h3 style={styles.resultsHeading}>Analysis Results:</h3>
          {prediction.map((point, index) => (
            <div key={index} style={styles.resultItem}>{point}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  textarea: {
    padding: '10px',
    minHeight: '150px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ffe6e6',
    borderRadius: '4px',
  },
  results: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  resultsHeading: {
    marginBottom: '10px',
    color: '#333',
  },
  resultItem: {
    marginBottom: '8px',
    lineHeight: '1.5',
  },
};

export default Predict;