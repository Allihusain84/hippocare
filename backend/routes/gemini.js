const express = require('express');
const router = express.Router();
const axios = require('axios');

// ✅ Correct: v1beta + latest stable model
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * POST /api/gemini/chat
 * Sends user message to Gemini API and returns response
 */
router.post('/chat', async (req, res) => {
  try {
    // ✅ Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'GEMINI_API_KEY not configured'
      });
    }

    // ✅ Validate input
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Valid message is required'
      });
    }

    // ✅ Request body (Gemini REST format per docs)
    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: message.trim() }]
        }
      ]
    };

    // ✅ API call — using x-goog-api-key header (official docs pattern)
    const response = await axios.post(GEMINI_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey          // ✅ correct auth header
      },
      timeout: 10000
    });

    // ✅ Extract response safely
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