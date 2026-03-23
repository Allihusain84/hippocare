const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

router.post('/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          { parts: [{ text: message }] }
        ]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.json({ reply });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
