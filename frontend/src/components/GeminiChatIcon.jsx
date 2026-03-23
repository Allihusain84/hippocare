/*
 * GeminiChatIcon.jsx
 * ------------------
 * Fixed-position floating button (bottom-right).
 * Displays the Gemini sparkle icon.
 * Clicking it opens the chat panel.
 */

import "./gemini.css";

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" />
  </svg>
);

const GeminiChatIcon = ({ onClick }) => (
  <button
    className="gc-fab"
    onClick={onClick}
    aria-label="Open Gemini Health Assistant"
    title="Gemini Health Assistant"
  >
    <SparkleIcon />
  </button>
);

export default GeminiChatIcon;
