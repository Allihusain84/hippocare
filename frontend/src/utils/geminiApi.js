/*
 * geminiApi.js
 * -----------
 * Clean utility for communicating with the Google Gemini 1.5 Flash API.
 * The API key is loaded from the Vite environment variable VITE_GEMINI_API_KEY
 * (defined in the project-root .env file) and is NEVER hardcoded.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Send a user message to Gemini and return the generated text.
 *
 * @param {string} userMessage – plain-text message from the user
 * @returns {Promise<string>} – AI-generated reply text
 */
export async function fetchGeminiResponse(userMessage) {
  /* ---- guard: missing key ---- */
  if (!GEMINI_API_KEY) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not set. " +
        "Please add it to your .env file and restart the dev server."
    );
  }

  /* ---- call Gemini ---- */
  let res;
  try {
    res = await fetch(
      `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );
  } catch (networkErr) {
    throw new Error(
      "Unable to reach the Gemini service. Please check your internet connection and try again."
    );
  }

  /* ---- handle non-OK status ---- */
  if (!res.ok) {
    let detail = `Status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error?.message) {
        detail = body.error.message;
      }
    } catch {
      /* ignore parse failure – we already have the status code */
    }
    throw new Error(`Gemini request failed – ${detail}`);
  }

  /* ---- parse successful response ---- */
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error(
      "Gemini returned an empty response. Please try rephrasing your question."
    );
  }

  return text;
}
