// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { message, sessionID } = req.body;

  try {
    // Replace with your actual NLP service endpoint and API key
    const nlpResponse = await axios.post('https://api.nlp-service.com/parse', {
      text: message,
      session_id: sessionID
    });

    const { reply, intent, entities } = nlpResponse.data;

    if (intent === 'unhandled') {
      res.json({ message: "I'm not sure how to respond to that. Could you please rephrase?" });
    } else {
      res.json({ message: reply });
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ message: 'Error processing your request.' });
  }
});

module.exports = router;
