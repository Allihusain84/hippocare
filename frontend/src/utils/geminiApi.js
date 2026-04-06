/**
 * geminiApi.js
 * Sends messages to Gemini via the backend proxy so the API key
 * never leaves the server.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function fetchGeminiResponse(userMessage) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/gemini/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check your connection and try again."
    );
  }

  if (!res.ok) {
    let detail = `Status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) detail = body.error;
    } catch { /* ignore */ }
    throw new Error(`Gemini request failed – ${detail}`);
  }

  const data = await res.json();
  if (!data?.reply) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  return data.reply;
}
