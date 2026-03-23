import { useEffect } from "react";
import "./SlidePanel.css";

/**
 * SlidePanel – reusable side-panel that slides in from the right.
 *
 * Props:
 *  - isOpen    : boolean – controls panel visibility
 *  - onClose   : callback to close the panel
 *  - children  : content rendered inside the panel
 */
const SlidePanel = ({ isOpen, onClose, children }) => {
  /* Lock body scroll when panel is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close panel on Escape key press */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div className={`slide-panel-wrapper ${isOpen ? "slide-panel-wrapper--open" : ""}`}>
      {/* Dark overlay */}
      <div className="slide-panel__overlay" onClick={onClose} />

      {/* Panel that slides in from the right */}
      <aside className="slide-panel" role="dialog" aria-modal="true">
        {/* Close button */}
        <button className="slide-panel__close" onClick={onClose} aria-label="Close panel">
          ✕
        </button>
        <div className="slide-panel__body">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default SlidePanel;
