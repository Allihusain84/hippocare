import { useState, useRef, useEffect } from "react";
import "./LoginDropdown.css";

/**
 * LoginDropdown – hover-activated dropdown showing role-based login options.
 *
 * Props:
 *  - onSelect(role)  : callback fired when a role option is clicked
 */

/* The four login roles displayed in the dropdown */
const loginRoles = [
  { key: "admin",   label: "Admin Login",   icon: "🛡️" },
  { key: "doctor",  label: "Doctor Login",  icon: "🩺" },
  { key: "patient", label: "Patient Login", icon: "👤" },
  { key: "staff",   label: "Staff Login",   icon: "🏥" },
];

const LoginDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  /* Open on mouse-enter with a tiny delay guard */
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  /* Close after a short grace period so cursor can travel to the dropdown */
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  /* Also close when clicking outside (mobile / touch fallback) */
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div
      className="login-dd"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <span data-tooltip="Access your account">
      <button
        className={`login-dd__trigger ${open ? "login-dd__trigger--active" : ""}`}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Login <span className="login-dd__arrow">{open ? "▲" : "▼"}</span>
      </button>
      </span>

      {/* Dropdown card */}
      <div className={`login-dd__menu ${open ? "login-dd__menu--visible" : ""}`}>
        {loginRoles.map((role) => (
          <button
            key={role.key}
            className="login-dd__option"
            onClick={() => {
              onSelect(role.key);
              setOpen(false);
            }}
          >
            <span className="login-dd__option-icon">{role.icon}</span>
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginDropdown;
