import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (supabaseError || !data?.user) {
      setError(supabaseError?.message || "Invalid credentials.");
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
      return;
    }

    localStorage.setItem("hmsRole", profile.role);
    localStorage.setItem("hmsProfile", JSON.stringify(profile));
    localStorage.removeItem("hmsDoctorId");
    localStorage.removeItem("hmsStaffId");

    navigate(`/${profile.role}`);
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