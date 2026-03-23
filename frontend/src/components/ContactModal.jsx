/*
 * ContactModal.jsx
 * ----------------
 * Wraps the existing Contact component in a centered modal popup.
 * Closes on: outside click, overlay click, ESC key.
 */

import { useRef, useEffect } from "react";
import Contact from "../pages/Contact";
import "./ContactModal.css";

const ContactModal = ({ isOpen, onClose }) => {
  const boxRef = useRef(null);

  /* Close on ESC key */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  /* Close on click outside the modal box */
  const handleOverlayClick = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className={`cm-overlay${isOpen ? " cm-overlay--open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`cm-box${isOpen ? " cm-box--open" : ""}`}
        ref={boxRef}
      >
        <Contact />
      </div>
    </div>
  );
};

export default ContactModal;
