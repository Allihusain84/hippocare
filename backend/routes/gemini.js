const express = require('express');
const router = express.Router();
const axios = require('axios');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openrouter/auto'; // ✅ auto picks best available model

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

    const response = await axios.post(OPENROUTER_URL, {
      model: MODEL,
      messages: [{ role: 'user', content: message.trim() }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 10000
    });

    const reply =
      response?.data?.choices?.[0]?.message?.content ||
      'No response';

    return res.status(200).json({ success: true, reply });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);

    const errorMessage =
      error?.response?.data?.error?.message ||
      error.message ||
      'Something went wrong';

    return res.status(500).json({ success: false, error: errorMessage });
  }
});

module.exports = router;