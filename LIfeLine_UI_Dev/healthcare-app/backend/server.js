const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const adminAuthRoutes = require('./routes/adminAuth');
const bookingsRoutes = require('./routes/bookings'); 
const enrollmentRoutes = require('./routes/enrollmentRoutes'); 

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');

    // Define a base route
    app.get('/', (req, res) => {
      res.send('Welcome to the Healthcare API!');
    });

    // Mount all routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/admin-auth', adminAuthRoutes);
    app.use('/api/bookings', bookingsRoutes); 
    app.use('/api/enroll', enrollmentRoutes);

    // AI Prediction Route
    app.post('/api/predict', async (req, res) => {
      const { prompt} = req.body; 
      try {
        const final_prompt = "I am conducting a college project where I am analyzing various symptoms and their potential implications. Based on the following symptoms, please provide a detailed hypothetical diagnosis, possible medications, and general health tips. Additionally, suggest the types of healthcare facilities that would typically be relevant for these symptoms: "+prompt+". Don't use sentences like It is important to remember that I am an AI and cannot provide medical advice. Please ensure your response is structured and informative, focusing on educational insights rather than specific medical advice. Don't user bold, italic, or any kind of special font, use plain font.";
        const result = await model.generateContent(final_prompt);
        const rawResponse = result.response.text();
        const formattedResponse = formatResponse(rawResponse);
        res.json({ response: formattedResponse });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate response' });
      }
    });

    const formatResponse = (text) => {
      // Remove any unwanted symbols
      let cleanedText = text.replace(/[\*\_\#`]/g, ''); // Remove *, _, and `
      
      // Split by new lines and filter out empty lines
      const lines = cleanedText.split('\n').filter(line => line.trim() !== '');
    
      // Convert lines into bullet points
      const bulletPoints = lines.map(line => `• ${line.trim()}`);
    
      return bulletPoints;
    };

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
