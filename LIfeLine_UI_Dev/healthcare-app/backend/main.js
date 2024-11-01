const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

//const genAI = new GoogleGenerativeAI("AIzaSyDrhs9sKwY0NPMk6qm1yhSRjigl5ueKDu8");

async function generateAIResponse() {
  // Initialize the client with your API key
  const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);
  // Get the generative model instance
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Define the prompt
  const prompt = "Explain how AI works";

  // Generate content from the model
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text()); // Display the response text
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Call the function
generateAIResponse();
