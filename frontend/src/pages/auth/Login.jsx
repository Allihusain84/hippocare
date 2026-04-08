import { supabase } from "../../lib/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "./Login.css";

/* ── Demo credentials ────────────────────────────────────────────────── */
const DEMO_ADMIN = { email: "admin@hippocare.in", password: "Admin@123", label: "🛡️ Admin" };
const DEMO_PATIENT = { email: "patient@hippocare.in", password: "Demo@123", label: "🧑‍⚕️ Patient" };

const DEMO_DOCTORS = [
  {
    dept: "General Medicine",
    doctors: [
      { name: "Dr. Meera Iyer", email: "meera.iyer@hippocare.in", password: "Demo@123" },
      { name: "Dr. Sunil Patil", email: "sunil.patil@hippocare.in", password: "Demo@123" },
    ],
  },
  {
    dept: "Cardiology",
    doctors: [
      { name: "Dr. Aisha Verma", email: "aisha.verma@hippocare.in", password: "Demo@123" },
      { name: "Dr. Vikram Deshmukh", email: "vikram.deshmukh@hippocare.in", password: "Demo@123" },
    ],
  },
  {
    dept: "Orthopedics",
    doctors: [
      { name: "Dr. Rajesh Kumar", email: "rajesh.kumar@hippocare.in", password: "Demo@123" },
    ],
  },
  {
    dept: "Pediatrics",
    doctors: [
      { name: "Dr. Priya Nair", email: "priya.nair@hippocare.in", password: "Demo@123" },
    ],
  },
];

const DEMO_STAFF = { email: "staff@hippocare.in", password: "Demo@123", label: "👷 Staff" };

/* ─────────────────────────────────────────────────────────────────────── */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDept, setOpenDept] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* Pre-fill demo credentials based on ?role= query param */
  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "admin") {
      setEmail(DEMO_ADMIN.email);
      setPassword(DEMO_ADMIN.password);
    } else if (role === "patient") {
      setEmail(DEMO_PATIENT.email);
      setPassword(DEMO_PATIENT.password);
    } else if (role === "doctor") {
      const firstDoc = DEMO_DOCTORS[0]?.doctors[0];
      if (firstDoc) {
        setEmail(firstDoc.email);
        setPassword(firstDoc.password);
      }
    }
  }, [searchParams]);

  const fillCredentials = (e, pw) => {
    setEmail(e);
    setPassword(pw);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (supabaseError || !data?.user) {
      setError(supabaseError?.message || "Invalid credentials.");
      setLoading(false);
      return;
    }

    const user = data.user;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      setError("Profile not found. Please contact admin.");
      setLoading(false);
      return;
    }

    localStorage.setItem("hmsRole", profile.role);
    localStorage.setItem("hmsProfile", JSON.stringify(profile));
    localStorage.removeItem("hmsDoctorId");
    localStorage.removeItem("hmsStaffId");

    setLoading(false);
    navigate(`/${profile.role}`);
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1>Login</h1>
        <p>Sign in to your Hippocare portal</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="auth__error">{error}</p>}
          <button type="submit" className="auth__button" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* ── Demo Credentials ── */}
        <div className="auth__demo">
          <h4>
            Demo Credentials{" "}
            <span className="auth__demo-hint">— click any card to fill</span>
          </h4>

          {/* Admin + Patient quick pills */}
          <div className="auth__demo-system">
            <button
              type="button"
              className="auth__demo-pill"
              onClick={() => fillCredentials(DEMO_ADMIN.email, DEMO_ADMIN.password)}
            >
              {DEMO_ADMIN.label}
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "#64748b" }}>
                {DEMO_ADMIN.email}
              </span>
            </button>
            <button
              type="button"
              className="auth__demo-pill"
              onClick={() => fillCredentials(DEMO_PATIENT.email, DEMO_PATIENT.password)}
            >
              {DEMO_PATIENT.label}
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "#64748b" }}>
                {DEMO_PATIENT.email}
              </span>
            </button>
          </div>

          {/* Doctor department accordion */}
          <div className="auth__demo-depts">
            {DEMO_DOCTORS.map((dept) => (
              <div
                key={dept.dept}
                className={`auth__demo-dept ${openDept === dept.dept ? "auth__demo-dept--open" : ""}`}
              >
                <button
                  type="button"
                  className="auth__demo-dept-btn"
                  onClick={() =>
                    setOpenDept((prev) => (prev === dept.dept ? null : dept.dept))
                  }
                >
                  🩺 {dept.dept}
                  <span className="auth__demo-dept-arrow">
                    {openDept === dept.dept ? "▲" : "▼"}
                  </span>
                </button>
                {openDept === dept.dept && (
                  <ul className="auth__demo-dept-list">
                    {dept.doctors.map((doc) => (
                      <li key={doc.email}>
                        <button
                          type="button"
                          className="auth__demo-doc-btn"
                          onClick={() => fillCredentials(doc.email, doc.password)}
                        >
                          <span className="auth__demo-doc-name">{doc.name}</span>
                          <div className="auth__demo-doc-creds">
                            <span className="auth__demo-doc-email">{doc.email}</span>
                            <span className="auth__demo-doc-pwd">{doc.password}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Staff quick link */}
          <div className="auth__demo-staff">
            <p className="auth__demo-staff-title">Staff Portal</p>
            <button
              type="button"
              className="auth__demo-pill"
              style={{ width: "100%" }}
              onClick={() => fillCredentials(DEMO_STAFF.email, DEMO_STAFF.password)}
            >
              {DEMO_STAFF.label}&nbsp;—&nbsp;
              <span style={{ fontWeight: 400, fontSize: "0.75rem" }}>{DEMO_STAFF.email}</span>
            </button>
          </div>

          <p className="auth__demo-note">
            All demo passwords are <strong>Demo@123</strong> (Admin: <strong>Admin@123</strong>)
          </p>
        </div>

        <div className="auth__links">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;