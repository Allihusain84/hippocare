const express = require('express');
const router = express.Router();
const axios = require('axios');

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

router.post('/generate', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = req.body;
    console.log('Gemini Key:', apiKey);
    console.log('Prompt:', prompt);
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data?.error?.message || error.message });
  }
});

module.exports = router;
