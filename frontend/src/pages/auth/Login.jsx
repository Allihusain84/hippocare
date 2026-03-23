import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { credentials as liveCredentials } from "../../data/credentials";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // 1️⃣ Try Supabase Login First
    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!supabaseError && data?.user) {
      const user = data.user;
      // Fetch user profile from users table
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        localStorage.setItem("hmsRole", profile.role);
        localStorage.setItem("hmsProfile", JSON.stringify(profile));
        navigate(`/${profile.role}`);
        return;
      } else {
        setError("Profile not found. Please contact admin.");
        return;
      }
    }

    // 2️⃣ If Supabase login fails → try Demo credentials
    if (supabaseError) {
      const found = Object.values(liveCredentials).find(
        (item) => item.email === email && item.password === password
      );

      if (!found) {
        setError("Invalid credentials.");
        return;
      }

      localStorage.setItem("hmsRole", found.role);
      if (found.doctorId) {
        localStorage.setItem("hmsDoctorId", found.doctorId);
      }
      if (found.staffId) {
        localStorage.setItem("hmsStaffId", found.staffId);
      }
      navigate(`/${found.role}`);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1>Login</h1>
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
          <button type="submit" className="auth__button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;