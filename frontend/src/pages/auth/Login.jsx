import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

        <div className="auth__links">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;