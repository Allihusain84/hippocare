import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import staffData from "../../data/staffData";
import "./StaffLogin.css";

const staffList = Object.values(staffData);

const StaffLogin = () => {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const upperId = staffId.toUpperCase().trim();
    const staff = staffData[upperId];
    if (!staff || staff.password !== password) {
      setError("Invalid Staff ID or Password. Try the demo credentials below.");
      return;
    }
    localStorage.setItem("hmsRole", "staff");
    localStorage.setItem("hmsStaffId", staff.id);
    navigate("/staff");
  };

  const fillCredentials = (id, pass) => {
    setStaffId(id);
    setPassword(pass);
    setError("");
  };

  return (
    <div className="slogin">
      {/* ── Top Branding Bar ── */}
      <div className="slogin__brand-bar">
        <Link to="/" className="slogin__brand">
          <span className="slogin__brand-icon">🏥</span>
          <span className="slogin__brand-text">Hippocare Hospital</span>
        </Link>
        <div className="slogin__brand-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Doctor Login</Link>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div className="slogin__hero">
        <div className="slogin__hero-overlay" />
        <div className="slogin__hero-content">
          <span className="slogin__hero-badge">Staff Portal</span>
          <h1>Welcome, Hospital Staff</h1>
          <p>Access your duty schedule, assignments & patient information</p>
        </div>
      </div>

      {/* ── Login Card ── */}
      <div className="slogin__container">
        <div className="slogin__card">
          <div className="slogin__card-header">
            <div className="slogin__card-icon">👨‍⚕️</div>
            <h2>Staff Sign In</h2>
            <p>Enter your Staff ID and Password</p>
          </div>

          <form className="slogin__form" onSubmit={handleSubmit}>
            <label className="slogin__label">
              <span>Staff ID</span>
              <input
                type="text"
                className="slogin__input"
                placeholder="e.g. STF-101"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                required
              />
            </label>
            <label className="slogin__label">
              <span>Password</span>
              <input
                type="password"
                className="slogin__input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="slogin__error">{error}</p>}
            <button type="submit" className="slogin__submit">
              Sign In
            </button>
          </form>

          <div className="slogin__divider">
            <span>Demo Credentials</span>
          </div>

          {/* ── Demo Staff Cards ── */}
          <div className="slogin__demo-grid">
            {staffList.map((s) => (
              <button
                key={s.id}
                type="button"
                className="slogin__demo-card"
                onClick={() => fillCredentials(s.id, s.password)}
              >
                <div className="slogin__demo-avatar">
                  {s.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="slogin__demo-info">
                  <span className="slogin__demo-name">{s.name}</span>
                  <span className="slogin__demo-meta">{s.id} · {s.department}</span>
                  <span className="slogin__demo-role">{s.role}</span>
                </div>
                <span className="slogin__demo-pass">Pass: {s.password}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
