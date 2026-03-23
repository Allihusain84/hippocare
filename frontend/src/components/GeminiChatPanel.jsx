/*
 * GeminiChatPanel.jsx
 * -------------------
 * Slide-in chat panel that connects to Google Gemini 1.5 Flash.
 * All API logic is delegated to ../utils/geminiApi.js.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { fetchGeminiResponse } from "../utils/geminiApi";
import "./gemini.css";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Quick-start suggestions                                            */
/* ------------------------------------------------------------------ */

const SUGGESTIONS = [
  "What are common symptoms of the flu?",
  "Tell me about paracetamol dosage",
  "When should I see a cardiologist?",
  "How do I book an appointment here?",
];

/* ------------------------------------------------------------------ */
/*  Basic markdown-ish formatter (bold + bullet lists)                 */
/* ------------------------------------------------------------------ */

function renderMarkdown(raw) {
  if (!raw) return null;

  const bold = (s) => s.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  const lines = raw.split("\n");
  const out = [];
  let list = [];

  const flushList = () => {
    if (list.length === 0) return;
    out.push(
      <ul key={`ul-${out.length}`}>
        {list.map((li, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: bold(li) }} />
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((line, i) => {
    const t = line.trim();
    if (/^[-*•]\s+/.test(t)) {
      list.push(t.replace(/^[-*•]\s+/, ""));
    } else {
      flushList();
      if (t) {
        out.push(
          <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: bold(t) }} />
        );
      }
    }
  });
  flushList();
  return out;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const GeminiChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll on new content */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Focus the input when panel opens */
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  /* ----- send handler ----- */
  const send = useCallback(
    async (overrideText) => {
      const text = (overrideText ?? input).trim();
      if (!text || loading) return;

      setMessages((prev) => [...prev, { from: "user", text }]);
      setInput("");
      setLoading(true);

      try {
        const reply = await fetchGeminiResponse(text);
        setMessages((prev) => [...prev, { from: "bot", text: reply }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            from: "error",
            text: err.message || "Something went wrong. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /* ----- JSX ----- */
  return (
    <>
      {/* Dark overlay */}
      <div
        className={`gc-overlay${isOpen ? " gc-overlay--open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside className={`gc-panel${isOpen ? " gc-panel--open" : ""}`}>
        {/* Header */}
        <header className="gc-header">
          <div className="gc-header__left">
            <SparkleIcon />
            <div>
              <h3 className="gc-header__title">Gemini Health Assistant</h3>
              <span className="gc-header__sub">Powered by Google Gemini AI</span>
            </div>
          </div>
          <button className="gc-header__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        {/* Messages */}
        <div className="gc-messages">
          {messages.length === 0 && !loading && (
            <div className="gc-welcome">
              <SparkleIcon />
              <h4>Welcome to Hippocare AI Assistant</h4>
              <p>
                Ask me about medicines, symptoms, health tips, or appointment
                guidance. I&#39;m here to help!
              </p>
              <div className="gc-welcome__chips">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
            if (msg.from === "user") {
              return (
                <div key={i} className="gc-bubble gc-bubble--user">
                  {msg.text}
                </div>
              );
            }
            if (msg.from === "error") {
              return (
                <div key={i} className="gc-bubble gc-bubble--error">
                  ⚠️ {msg.text}
                </div>
              );
            }
            return (
              <div key={i} className="gc-bubble gc-bubble--bot">
                {renderMarkdown(msg.text)}
              </div>
            );
          })}

          {loading && (
            <div className="gc-dots">
              <span />
              <span />
              <span />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="gc-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about health, medicines, symptoms…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
          />
          <button
            className="gc-input__send"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>
      </aside>
    </>
  );
};

export default GeminiChatPanel;
