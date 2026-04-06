const express = require('express');
const router = express.Router();
const axios = require('axios');

// ✅ Use stable API version + model
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

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

    // ✅ Request body (Gemini format)
    const requestBody = {
      contents: [
        {
          parts: [{ text: message.trim() }]
        }
      ]
    };

    // ✅ API call
    const response = await axios.post(
      `${GEMINI_URL}?key=${apiKey}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // prevent hanging
      }
    );

    // ✅ Extract response safely
    const reply =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from Gemini';

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    // ✅ Log full error (important for debugging)
    console.error('Gemini API Error:', error.response?.data || error.message);

    const errorMessage =
      error?.response?.data?.error?.message ||
      error.message ||
      'Something went wrong';

    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

module.exports = router;