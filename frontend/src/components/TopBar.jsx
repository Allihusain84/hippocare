import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import SlidePanel from "./SlidePanel";
import { LoginForm } from "./AuthForms";
import "./TopBar.css";

/**
 * TopBar – slim hospital info bar displayed at the very top of the website.
 *
 * Left  : phone · email · 24/7 availability
 * Right : Login (with hover dropdown) · Register button
 *
 * When a login role or Register is clicked, a SlidePanel opens from the right.
 */
const TopBar = () => {
  const navigate = useNavigate();
  /* Which panel is currently open: null | "login" */
  const [panelType, setPanelType] = useState(null);
  /* The role selected from the login dropdown (admin / doctor / patient / staff) */
  const [selectedRole, setSelectedRole] = useState("");
  /* Counter to force fresh remount of panel children */
  const [panelKey, setPanelKey] = useState(0);

  /* Called when a dropdown option is clicked */
  const handleLoginSelect = (role) => {
    if (role === "staff") {
      navigate("/staff-login");
      return;
    }
    setSelectedRole(role);
    setPanelType("login");
    setPanelKey((k) => k + 1); /* force fresh mount */
  };

  // Register click handler removed

  /* Close whichever panel is open */
  const closePanel = () => {
    setPanelType(null);
  };

  return (
    <>
      {/* ── Slim top bar ── */}
      <div className="topbar">
        <div className="topbar__inner">
          {/* ── Left side: contact info ── */}
          <div className="topbar__left">
            <span className="topbar__item">
              <span className="topbar__icon">📞</span>
              +91 7570869211
            </span>
            <span className="topbar__divider" aria-hidden="true" />
            <span className="topbar__item">
              <span className="topbar__icon">✉️</span>
              Hippocare1942@gmail.com
            </span>
            <span className="topbar__divider" aria-hidden="true" />
            <span className="topbar__item">
              <span className="topbar__icon">🕒</span>
              24/7 Available
            </span>
          </div>

          {/* ── Right side: login dropdown only ── */}
          <div className="topbar__right">
            <LoginDropdown onSelect={handleLoginSelect} />
          </div>
        </div>
      </div>

      {/* ── Slide-in panel (Login or Register form) ── */}
      <SlidePanel isOpen={panelType !== null} onClose={closePanel}>
        {panelType === "login" && (
          <LoginForm key={panelKey} role={selectedRole} onClose={closePanel} />
        )}
      </SlidePanel>
    </>
  );
};

export default TopBar;
