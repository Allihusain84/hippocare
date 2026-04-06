import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Auto-hide error/message after 4 seconds
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage("") , 4000);
  };
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError("") , 4000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const { name, email, password, role } = form;

    // 1️⃣ Register user in Supabase Auth with name metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      showError(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      showError("Registration failed. No user returned.");
      return;
    }

    // 2️⃣ Insert profile in profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          name: name,
          email: email,
          role: role
        }
      ]);

    if (profileError) {
      showError("User created but profile insert failed: " + profileError.message);
      return;
    }

    showMessage("Registration successful. You can now login.");
    setForm({ name: "", email: "", password: "", role: "patient" });
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1>Create Account</h1>
        <p>Register to explore the Hippocare portal</p>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="name@hospital.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error && <p className="auth__error">{error}</p>}
          {message && <p className="auth__message">{message}</p>}

          <button type="submit" className="auth__button">
            Register
          </button>
        </form>

        <div className="auth__links">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;