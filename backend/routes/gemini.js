const express = require('express');
const router = express.Router();
const axios = require('axios');

// ✅ Updated to current stable model (gemini-1.5-flash is deprecated)
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

router.post('/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured' });
    }

    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Valid message is required' });
    }

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: message.trim() }]
        }
      ]
    };

    const response = await axios.post(GEMINI_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey   // ✅ official auth header from docs
      },
      timeout: 10000
    });

    const reply =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from Gemini';

    return res.status(200).json({ success: true, reply });

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);

    const errorMessage =
      error?.response?.data?.error?.message ||
      error.message ||
      'Something went wrong';

    return res.status(500).json({ success: false, error: errorMessage });
  }
});

module.exports = router;