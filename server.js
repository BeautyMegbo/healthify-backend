const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require ('cors');
app.use(cors(
    
))
// OpenAI API URL
const OPENAI_API_URL = "https://api.openai.com/v1/completions";

// Route for AI Diagnosis
app.post('/api/ai-diagnosis', async (req, res) => {
    const { symptoms } = req.body; // User provides symptoms

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4", // Using GPT-4 for advanced analysis
                prompt: `Based on the following symptoms: ${symptoms}, provide a medical diagnosis and possible treatment plan.`,
                max_tokens: 500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const diagnosis = response.data.choices[0].text;
        res.status(200).json({ diagnosis });
    } catch (error) {
        res.status(500).json({ message: "Error generating diagnosis", error: error.message });
    }
});

// Route for AI Prescription
app.post('/api/ai-prescription', async (req, res) => {
    const { age, weight, condition } = req.body;

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4",
                prompt: `A patient is ${age} years old, weighs ${weight} kg, and is diagnosed with ${condition}. Provide a detailed prescription and treatment plan.`,
                max_tokens: 500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const prescription = response.data.choices[0].text;
        res.status(200).json({ prescription });
    } catch (error) {
        res.status(500).json({ message: "Error generating prescription", error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/api/ai-diagnosis', async (req, res) => {
  const { symptoms } = req.body;

  try {
      const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
              model: "gpt-4",
              prompt: `Based on the following symptoms: ${symptoms}, provide a medical diagnosis.`,
              max_tokens: 500,
              temperature: 0.7
          },
          {
              headers: {
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      const diagnosis = response.data.choices[0].text;
      res.status(200).json({ diagnosis });
  } catch (error) {
      res.status(500).json({ message: "Error generating diagnosis", error: error.message });
  }
});

app.post('/api/ai-prescription', async (req, res) => {
  const { age, weight, condition } = req.body;

  try {
      const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
              model: "gpt-4",
              prompt: `A patient is ${age} years old, weighs ${weight} kg, and is diagnosed with ${condition}. Provide a detailed prescription.`,
              max_tokens: 500,
              temperature: 0.7
          },
          {
              headers: {
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      const prescription = response.data.choices[0].text;
      res.status(200).json({ prescription });
  } catch (error) {
      res.status(500).json({ message: "Error generating prescription", error: error.message });
  }
});

