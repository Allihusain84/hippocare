import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import searchIndex from "../data/searchIndex";
import "../styles/search-animation.css";

/**
 * SearchAnimButton – 3D animated search icon that expands into a floating search bar
 * with real-time search results dropdown.
 *
 * 1. Click → icon does a 3D rotateY spin + scale pop (0.35 s)
 * 2. After spin → search bar expands smoothly
 * 3. Typing filters searchIndex in real time (case-insensitive, partial match)
 * 4. Clicking a result navigates + scrolls to top
 * 5. Click ✕, Escape, or outside → bar collapses
 */
const SearchAnimButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  /* ── Filter results ── */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) => item.keywords.includes(q) || item.title.toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  /* Reset highlight when results change */
  useEffect(() => {
    setHighlightIdx(-1);
  }, [results]);

  /* ── Navigate to result ── */
  const goTo = useCallback(
    (route) => {
      setIsOpen(false);
      setQuery("");
      // Handle hash routes like /#about
      if (route.includes("#")) {
        const [path, hash] = route.split("#");
        navigate(path || "/");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      } else {
        navigate(route);
        // ScrollToTop component handles the smooth scroll
      }
    },
    [navigate]
  );

  /* ── Handle icon click ── */
  const handleClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setQuery("");
      return;
    }
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setIsOpen(true);
    }, 350);
  }, [isOpen]);

  /* Focus input once bar opens */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) setQuery("");
  }, [isOpen]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIdx((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIdx((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && highlightIdx >= 0 && results[highlightIdx]) {
        e.preventDefault();
        goTo(results[highlightIdx].route);
      }
    },
    [results, highlightIdx, goTo]
  );

  /* Scroll highlighted item into view */
  useEffect(() => {
    if (highlightIdx >= 0 && resultsRef.current) {
      const item = resultsRef.current.children[highlightIdx];
      if (item) item.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIdx]);

  /* Close when clicking outside */
  useEffect(() => {
    const onClick = (e) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const showResults = isOpen && query.trim().length > 0;

  return (
    <div className="search-anim-wrapper" ref={wrapperRef}>
      <button
        className={`search-anim__btn${spinning ? " search-anim__btn--spinning" : ""}`}
        onClick={handleClick}
        aria-label="Search"
        title="Search"
      >
        🔍
      </button>

      <div className={`search-anim__bar${isOpen ? " search-anim__bar--open" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search doctors, services…"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="search-anim__close"
          onClick={() => { setIsOpen(false); setQuery(""); }}
          aria-label="Close search"
        >
          ✕
        </button>
      </div>

      {/* ── Results dropdown ── */}
      {showResults && (
        <div className="search-anim__results" ref={resultsRef}>
          {results.length > 0 ? (
            results.map((item, idx) => (
              <button
                key={item.route}
                className={`search-anim__result${idx === highlightIdx ? " search-anim__result--active" : ""}`}
                onClick={() => goTo(item.route)}
                onMouseEnter={() => setHighlightIdx(idx)}
              >
                <span className="search-anim__result-title">{item.title}</span>
                <span className="search-anim__result-cat">{item.category}</span>
              </button>
            ))
          ) : (
            <div className="search-anim__no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAnimButton;
