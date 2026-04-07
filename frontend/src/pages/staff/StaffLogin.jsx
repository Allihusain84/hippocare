import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./StaffLogin.css";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsProfile");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (authError || !data?.user) {
        setError(authError?.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, name, email")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        setError("Profile not found. Please contact admin.");
        setLoading(false);
        return;
      }

      if (profile.role !== "staff") {
        setError("This account is not registered as staff.");
        setLoading(false);
        return;
      }

      const { data: staffRecord, error: staffError } = await supabase
        .from("staff")
        .select("id, email")
        .eq("id", data.user.id)
        .single();

      if (staffError || !staffRecord) {
        setError("Staff record not found. Please contact admin.");
        setLoading(false);
        return;
      }

      if ((staffRecord.email || "").toLowerCase() !== normalizedEmail) {
        setError("Staff email mismatch. Please contact admin.");
        setLoading(false);
        return;
      }

      localStorage.setItem("hmsRole", profile.role);
      localStorage.setItem("hmsProfile", JSON.stringify(profile));
      setLoading(false);
      navigate("/staff");
    } catch (err) {
      console.error("Staff login failed:", err);
      setError("Unable to login right now. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="slogin">
      <div className="slogin__brand-bar">
        <Link to="/" className="slogin__brand">
          <span className="slogin__brand-icon">🏥</span>
          <span className="slogin__brand-text">Hippocare Hospital</span>
        </Link>
        <div className="slogin__brand-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="slogin__hero">
        <div className="slogin__hero-overlay" />
        <div className="slogin__hero-content">
          <span className="slogin__hero-badge">Staff Portal</span>
          <h1>Welcome, Hospital Staff</h1>
          <p>Access your duty schedule, assignments & patient information</p>
        </div>
      </div>

      <div className="slogin__container">
        <div className="slogin__card">
          <div className="slogin__card-header">
            <div className="slogin__card-icon">👨‍⚕️</div>
            <h2>Staff Sign In</h2>
            <p>Enter your email and password</p>
          </div>

          <form className="slogin__form" onSubmit={handleSubmit}>
            <label className="slogin__label">
              <span>Email</span>
              <input
                type="email"
                className="slogin__input"
                placeholder="name@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="slogin__submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
