const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * POST /api/gemini/chat
 * Proxies messages to Gemini so the API key stays server-side.
 */
router.post('/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${apiKey}`,
      { contents: [{ parts: [{ text: message }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ reply });
  } catch (error) {
    const msg = error?.response?.data?.error?.message || error.message;
    res.status(500).json({ error: msg });
  }
});

module.exports = router;
