import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./AuthForms.css";

const roleLabels = {
  admin: "Admin",
  doctor: "Doctor",
  patient: "Patient",
  staff: "Staff",
};

/**
 * LoginForm — real Supabase auth, shown inside the SlidePanel
 * when a role login is selected from the landing page.
 *
 * Props:
 *  - role    : string (admin | doctor | patient | staff)
 *  - onClose : callback to close the panel after login
 */
export const LoginForm = ({ role, onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
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

    if (profile.role !== role) {
      setError(`This account is registered as "${profile.role}", not "${role}".`);
      setLoading(false);
      return;
    }

    localStorage.setItem("hmsRole", profile.role);
    localStorage.setItem("hmsProfile", JSON.stringify(profile));
    setLoading(false);
    onClose();
    navigate(`/${profile.role}`);
  };

  return (
    <div className="auth-form">
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

        <button type="submit" className="auth-form__submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};
