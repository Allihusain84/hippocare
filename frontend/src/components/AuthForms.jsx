import { useState } from "react";
import './RegisterSuccess3D.css';
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { credentials as demoCredentials } from "../data/credentials";
import { credentials, demoDepartments, emailToDoctorId, getDoctorOverride, getAdminDoctorCredentials, getAdminDemoDepartments, getStaffCredentials, getStaffDemoList } from "../data/credentials";
import "./AuthForms.css";

/* Friendly labels for each role */
const roleLabels = {
  admin:   "Admin",
  doctor:  "Doctor",
  patient: "Patient",
  staff:   "Staff",
};

/**
 * LoginForm – shown inside the SlidePanel when a role login is selected.
 *
 * Props:
 *  - role    : string (admin | doctor | patient | staff)
 *  - onClose : callback to close the panel after login
 */
export const LoginForm = ({ role, onClose }) => {
  const navigate = useNavigate();
  const defaultCreds = credentials[role] || {};

  const [email, setEmail] = useState(defaultCreds.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDept, setOpenDept] = useState(null);

  /* Build live credentials fresh each render (reads localStorage) */
  const liveCredentials = (() => {
    const out = {};
    Object.entries(credentials).forEach(([key, cred]) => {
      if (cred.doctorId) {
        const ov = getDoctorOverride(cred.doctorId);
        const liveCred = { ...cred };
        if (ov?.security?.password) liveCred.password = ov.security.password;
        if (ov?.security?.loginEmail) liveCred.email = ov.security.loginEmail;
        out[key] = liveCred;
      } else {
        out[key] = cred;
      }
    });
    /* Override admin credentials from Settings → Profile */
    try {
      const ap = JSON.parse(localStorage.getItem("hmsSettingsAdminProfile") || "{}");
      if (out.admin) {
        if (ap.email) out.admin = { ...out.admin, email: ap.email };
        if (ap.password) out.admin = { ...out.admin, password: ap.password };
      }
    } catch {}
    /* Include admin-added doctor credentials */
    const adminCreds = getAdminDoctorCredentials();
    Object.entries(adminCreds).forEach(([key, cred]) => {
      if (!out[key]) {
        out[key] = { email: cred.email, password: cred.password || "doctor", role: "doctor", doctorId: cred.doctorId };
      }
    });
    /* Include staff credentials */
    const staffCreds = getStaffCredentials();
    Object.entries(staffCreds).forEach(([key, cred]) => {
      if (!out[`staff_${key}`]) {
        out[`staff_${key}`] = { email: cred.email, password: cred.password || "staff", role: "staff", staffId: cred.staffId };
      }
    });
    return out;
  })();

  const liveDemoDepartments = (() => {
    const base = demoDepartments.map((dept) => ({
      ...dept,
      doctors: dept.doctors.map((doc) => {
        const doctorId = emailToDoctorId[doc.email];
        if (!doctorId) return { ...doc, password: "doctor" };
        const ov = getDoctorOverride(doctorId);
        return {
          ...doc,
          label: ov?.profile?.name || doc.label,
          email: ov?.security?.loginEmail || doc.email,
          password: ov?.security?.password || "doctor",
        };
      }),
    }));
    /* Append admin-added doctor departments */
    const adminDepts = getAdminDemoDepartments();
    return [...base, ...adminDepts];
  })();

  const staffDemoList = getStaffDemoList();

  /* Auto-fill helper */
  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const found = Object.values(liveCredentials).find(
      (c) => c.email === email && c.password === password
    );

    if (!found) {
      setError("Invalid credentials. Try the demo accounts shown below.");
      return;
    }

    localStorage.setItem("hmsRole", found.role);
    if (found.doctorId) {
      localStorage.setItem("hmsDoctorId", found.doctorId);
    }
    if (found.staffId) {
      localStorage.setItem("hmsStaffId", found.staffId);
    }
    onClose();
    navigate(`/${found.role}`);
  };

  return (
    <div className="auth-form">
      {/* Header with role badge */}
      <div className="auth-form__header">
        <span className="auth-form__badge">{roleLabels[role] || "User"}</span>
        <h2>Welcome Back</h2>
        <p>Sign in to the {roleLabels[role] || "Hippocare"} portal</p>
      </div>

      <form className="auth-form__form" onSubmit={handleSubmit}>
        <label className="auth-form__label">
          Email
          <input
            type="email"
            className="auth-form__input"
            placeholder="name@hospital.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-form__label">
          Password
          <input
            type="password"
            className="auth-form__input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="auth-form__error">{error}</p>}

        <button type="submit" className="auth-form__submit">
          Sign In
        </button>
      </form>

      {/* ── Demo Credentials ── */}
      <div className="auth-form__demo">
        <h4>Demo Credentials <span className="auth-form__demo-hint">(click to auto-fill)</span></h4>

        {/* System quick pills (non-doctor roles) */}
        {role !== "doctor" && (
          <div className="auth-form__demo-system">
            {role === "admin" && (
              <button type="button" className="auth-form__demo-pill" onClick={() => fillCredentials("admin@hms.local", "admin")}>
                🔑 Admin — admin@hms.local
              </button>
            )}
            {role === "patient" && (
              <button type="button" className="auth-form__demo-pill" onClick={() => fillCredentials("patient@hms.local", "patient")}>
                🧑 Patient — patient@hms.local
              </button>
            )}
            {role === "staff" && (
              <button type="button" className="auth-form__demo-pill" onClick={() => fillCredentials("staff@hms.local", "staff")}>
                🏥 Staff — staff@hms.local
              </button>
            )}
          </div>
        )}

        {/* Staff demo list (admin-added) */}
        {role === "staff" && staffDemoList.length > 0 && (
          <div className="auth-form__demo-staff">
            <p className="auth-form__demo-staff-title">🏥 Admin-Added Staff Accounts</p>
            <ul className="auth-form__dept-list">
              {staffDemoList.map((s) => (
                <li key={s.email}>
                  <button type="button" className="auth-form__doc-btn" onClick={() => fillCredentials(s.email, s.password)}>
                    <span className="auth-form__doc-name">{s.label}</span>
                    <span className="auth-form__doc-creds">
                      <span className="auth-form__doc-email">{s.email}</span>
                      <span className="auth-form__doc-pwd">🔑 {s.password}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Doctor department-wise list */}
        {role === "doctor" && (
          <>
            <div className="auth-form__demo-depts">
              {liveDemoDepartments.map((d) => (
                <div key={d.dept} className={`auth-form__dept ${openDept === d.dept ? "auth-form__dept--open" : ""}`}>
                  <button
                    type="button"
                    className="auth-form__dept-btn"
                    onClick={() => setOpenDept(openDept === d.dept ? null : d.dept)}
                  >
                    <span>🏥 {d.dept}</span>
                    <span className="auth-form__dept-arrow">{openDept === d.dept ? "▲" : "▼"}</span>
                  </button>
                  {openDept === d.dept && (
                    <ul className="auth-form__dept-list">
                      {d.doctors.map((dr) => (
                        <li key={dr.email}>
                          <button
                            type="button"
                            className="auth-form__doc-btn"
                            onClick={() => fillCredentials(dr.email, dr.password)}
                          >
                            <span className="auth-form__doc-name">🩺 {dr.label}</span>
                            <span className="auth-form__doc-creds">
                              <span className="auth-form__doc-email">{dr.email}</span>
                              <span className="auth-form__doc-pwd">🔑 {dr.password}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className="auth-form__demo-note">Default password: <strong>doctor</strong> (unless changed from Settings)</p>
          </>
        )}

        {/* Admin-added doctor departments (shown for doctor role) */}
        {role === "doctor" && liveDemoDepartments.some((d) => d.dept.includes("(New)")) && (
          <p className="auth-form__demo-note" style={{marginTop: 4}}>Departments marked <strong>(New)</strong> were added by Admin</p>
        )}
      </div>
    </div>
  );
};

