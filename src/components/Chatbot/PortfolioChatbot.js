import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  botTextToParts,
  DEFAULT_SUGGESTIONS,
  replyToMessage,
  suggestionToPrompt,
} from "./chatKnowledge";
import "./PortfolioChatbot.css";

const INITIAL_BOT =
  "Hi — I’m **Varshani’s portfolio assistant**. Ask about her background, **education**, **work**, **skills**, **projects**, or **awards**, or tap a quick topic below.";

/** Mascot: blue bird — soft layered stroke arms + wrist dots + point arrow */
function ChatMascot() {
  return (
    <div className="portfolio-chat-mascot" aria-hidden>
      <div className="portfolio-chat-mascot-sync">
        <div className="portfolio-chat-mascot-hi">Hi!</div>
        <svg
          className="portfolio-chat-mascot-svg"
          viewBox="0 0 100 118"
          width="64"
          height="76"
          focusable="false"
        >
          <defs>
            <radialGradient id="portfolio-mascot-blue" cx="32%" cy="22%" r="75%">
              <stop offset="0%" stopColor="#c8ecff" />
              <stop offset="42%" stopColor="#4db8fc" />
              <stop offset="100%" stopColor="#156bb5" />
            </radialGradient>
            <linearGradient id="portfolio-mascot-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe0ef" />
              <stop offset="100%" stopColor="#ff7eb3" />
            </linearGradient>
            <clipPath id="portfolio-mascot-face-clip">
              <ellipse cx="50" cy="46" rx="24" ry="32" />
            </clipPath>
            <filter
              id="portfolio-mascot-arm-soft"
              x="-35%"
              y="-35%"
              width="170%"
              height="170%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="portfolio-chat-mascot-jelly">
            <ellipse cx="50" cy="112" rx="18" ry="4.5" fill="#094067" opacity="0.12" />

            <ellipse cx="38" cy="108" rx="6" ry="4" fill="url(#portfolio-mascot-pink)" stroke="#e04d84" strokeWidth="0.85" opacity="0.95" />
            <ellipse cx="62" cy="108" rx="6" ry="4" fill="url(#portfolio-mascot-pink)" stroke="#e04d84" strokeWidth="0.85" opacity="0.95" />

            <ellipse cx="50" cy="90" rx="14" ry="9" fill="url(#portfolio-mascot-blue)" stroke="#0a4f7a" strokeWidth="1.05" />

            {/* Tall (vertical) face oval — no pink ear dots, no belly patch */}
            <ellipse cx="50" cy="46" rx="24" ry="32" fill="url(#portfolio-mascot-blue)" stroke="#0a4f7a" strokeWidth="1.15" />

            <g clipPath="url(#portfolio-mascot-face-clip)">
              <g className="portfolio-chat-mascot-eyes">
                <ellipse cx="38" cy="38" rx="8.5" ry="15" fill="#fffffe" stroke="#094067" strokeWidth="1" />
                <ellipse cx="62" cy="38" rx="8.5" ry="15" fill="#fffffe" stroke="#094067" strokeWidth="1" />
                <ellipse cx="39" cy="39" rx="4" ry="7.5" fill="#1a1a1a" />
                <ellipse cx="61" cy="39" rx="4" ry="7.5" fill="#1a1a1a" />
                <ellipse cx="41" cy="34.5" rx="2.2" ry="3.4" fill="#fffffe" opacity="0.95" />
                <ellipse cx="63" cy="34.5" rx="2.2" ry="3.4" fill="#fffffe" opacity="0.95" />
              </g>

              <g className="portfolio-chat-mouth-hi">
                <path
                  fill="#0a2744"
                  opacity="0.12"
                  d="M40 58 Q50 55 60 58 L59 67 Q50 71 41 67 Z"
                />
                <path
                  fill="#fffffe"
                  d="M41 57.5 Q50 55 59 57.5 L58.2 65.5 Q50 69 41.8 65.5 Z"
                />
                <path
                  fill="none"
                  stroke="#094067"
                  strokeWidth="0.6"
                  strokeOpacity="0.45"
                  d="M44.5 58 L44.5 65 M48.5 57.5 L48.5 65.2 M52.5 57.3 L52.5 65.2 M56.5 57.5 L56.5 65"
                />
                <path
                  fill="none"
                  stroke="#094067"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  d="M38 57 Q50 54 62 57"
                />
                <path
                  fill="none"
                  stroke="#094067"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  d="M42 67 Q50 70 58 67"
                />
              </g>

              <path
                className="portfolio-chat-mouth-tap"
                fill="none"
                stroke="#094067"
                strokeWidth="2.4"
                strokeLinecap="round"
                d="M40 64 Q50 71 60 64"
              />
            </g>

            {/* Arms: thin layered strokes + wrist dots; point ends in small arrow */}
            <g className="portfolio-chat-hand-wave">
              <path
                fill="none"
                stroke="#062d47"
                strokeOpacity="0.2"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M26 67 C16 58 7 49 2 42"
              />
              <path
                fill="none"
                stroke="#0a4f7a"
                strokeWidth="3.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#portfolio-mascot-arm-soft)"
                d="M26 67 C16 58 7 49 2 42"
              />
              <path
                fill="none"
                stroke="#b8e8ff"
                strokeWidth="1.35"
                strokeLinecap="round"
                d="M26 67 C16 58 7 49 2 42"
              />
              <circle cx="26" cy="67" r="3.6" fill="url(#portfolio-mascot-blue)" stroke="#0a4f7a" strokeWidth="0.65" />
            </g>

            <g className="portfolio-chat-hand-point">
              <path
                fill="none"
                stroke="#062d47"
                strokeOpacity="0.2"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M74 66 C66 78 56 94 50 108"
              />
              <path
                fill="none"
                stroke="#0a4f7a"
                strokeWidth="3.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#portfolio-mascot-arm-soft)"
                d="M74 66 C66 78 56 94 50 108"
              />
              <path
                fill="none"
                stroke="#b8e8ff"
                strokeWidth="1.35"
                strokeLinecap="round"
                d="M74 66 C66 78 56 94 50 108"
              />
              <circle cx="74" cy="66" r="3.6" fill="url(#portfolio-mascot-blue)" stroke="#0a4f7a" strokeWidth="0.65" />
              <path
                fill="#7ad4ff"
                stroke="#0a4f7a"
                strokeWidth="0.65"
                strokeLinejoin="round"
                d="M50 100 L45 109 L55 109 Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Simple, recognizable chat glyph on the gradient FAB */
function ChatFabIcon() {
  return (
    <IoChatbubbleEllipsesOutline
      className="portfolio-chat-launcher-messaging-icon"
      size={28}
      aria-hidden
    />
  );
}

function BotLine({ text, onInternalNavigate }) {
  const parts = botTextToParts(text);
  return (
    <p className="portfolio-chat-bubble-text">
      {parts.map((p, idx) => {
        if (p.type === "bold") {
          return <strong key={idx}>{p.value}</strong>;
        }
        if (p.type === "link" && p.href) {
          if (p.href.startsWith("/")) {
            return (
              <Link
                key={idx}
                to={p.href}
                className="portfolio-chat-inline-link"
                onClick={onInternalNavigate}
              >
                {p.value}
              </Link>
            );
          }
          return (
            <a
              key={idx}
              href={p.href}
              className="portfolio-chat-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.value}
            </a>
          );
        }
        return <span key={idx}>{p.value}</span>;
      })}
    </p>
  );
}

function PortfolioChatbot() {
  const panelId = useMemo(
    () => `portfolio-chat-panel-${Math.random().toString(36).slice(2, 9)}`,
    []
  );
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome",
      role: "bot",
      text: INITIAL_BOT,
      suggestions: DEFAULT_SUGGESTIONS,
    },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const pushExchange = useCallback((userText) => {
    const trimmed = userText.trim();
    if (!trimmed) return;
    const { message, suggestions } = replyToMessage(trimmed);
    const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text: trimmed },
      { id: uid(), role: "bot", text: message, suggestions },
    ]);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput("");
    pushExchange(t);
  };

  const onSuggestion = (label) => {
    const prompt = suggestionToPrompt(label);
    pushExchange(prompt);
  };

  const last = messages[messages.length - 1];
  const chipList =
    last?.role === "bot" && Array.isArray(last.suggestions) && last.suggestions.length
      ? last.suggestions
      : DEFAULT_SUGGESTIONS;

  return (
    <div className="portfolio-chat-root" data-open={open ? "true" : "false"}>
      <div
        className="portfolio-chat-panel"
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio assistant chat"
        aria-hidden={!open}
      >
        <header className="portfolio-chat-header">
          <div className="portfolio-chat-header-text">
            <span className="portfolio-chat-title">Portfolio assistant</span>
            <span className="portfolio-chat-sub">Answers about this site — runs in your browser</span>
          </div>
          <button
            type="button"
            className="portfolio-chat-icon-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <AiOutlineClose aria-hidden size={22} />
          </button>
        </header>

        <div
          className="portfolio-chat-messages"
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((m) => (
            <article
              key={m.id}
              className={`portfolio-chat-row portfolio-chat-row--${m.role}`}
              aria-label={m.role === "user" ? "You said" : "Assistant said"}
            >
              <div className={`portfolio-chat-bubble portfolio-chat-bubble--${m.role}`}>
                {m.role === "bot" ? (
                  <BotLine text={m.text} onInternalNavigate={() => setOpen(false)} />
                ) : (
                  <p className="portfolio-chat-bubble-text">{m.text}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {chipList?.length ? (
          <div className="portfolio-chat-chips" aria-label="Suggested questions">
            {chipList.map((label) => (
              <button
                key={label}
                type="button"
                className="portfolio-chat-chip"
                onClick={() => onSuggestion(label)}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <form className="portfolio-chat-form" onSubmit={onSubmit}>
          <label htmlFor="portfolio-chat-input" className="portfolio-chat-sr-only">
            Message to portfolio assistant
          </label>
          <input
            id="portfolio-chat-input"
            ref={inputRef}
            className="portfolio-chat-input"
            placeholder="Ask about education, work, projects…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="portfolio-chat-send" aria-label="Send message">
            <AiOutlineSend size={20} aria-hidden />
          </button>
        </form>
      </div>

      <div className="portfolio-chat-fab-stack">
        {!open ? <ChatMascot /> : null}
        <button
          type="button"
          className={`portfolio-chat-launcher${open ? " portfolio-chat-launcher--open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close portfolio chat" : "Open portfolio chat"}
        >
          <span className="portfolio-chat-launcher-glow" aria-hidden />
          <span className="portfolio-chat-launcher-icon-wrap">
            <span
              className={`portfolio-chat-launcher-icon-layer${open ? "" : " portfolio-chat-launcher-icon-layer--show"}`}
              aria-hidden
            >
              <ChatFabIcon />
            </span>
            <span
              className={`portfolio-chat-launcher-icon-layer${open ? " portfolio-chat-launcher-icon-layer--show" : ""}`}
              aria-hidden
            >
              <AiOutlineClose className="portfolio-chat-launcher-close-icon" size={26} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default PortfolioChatbot;
