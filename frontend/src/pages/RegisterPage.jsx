import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoPng from "../assets/images/logo.png";
import "../styles/pages/login-page.css";
import { register as registerApi } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!name.trim() || !trimmedEmail || password.trim().length < 6) {
      setError("Please provide name, valid email and password (min 6 chars).");
      return;
    }

    try {
      setLoading(true);
      const data = await registerApi({ name: name.trim(), email: trimmedEmail, password, role });

      // Do not auto-login. Show success message and let user login manually.
      setRegistered(true);
      setMessage(data?.message || "Congrats! You registered successfully");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (registered) {
    return (
      <div className="login">
        <div className="login__card" role="main" aria-label="Registered">
          <div className="login__brand">
            <img className="login__logo" src={logoPng} alt="ProManage" />
            <div>
              <div className="login__title">Registration complete</div>
            </div>
          </div>

          <div className="login__form" style={{ padding: 20 }}>
            <div className="login__success">{message}</div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn--primary" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login__card" role="main" aria-label="Register">
        <div className="login__brand">
          <img className="login__logo" src={logoPng} alt="ProManage" />
          <div>
            <div className="login__title">Create account</div>
            <div className="login__subtitle">Start your ProManage workspace</div>
          </div>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label">Name</label>
            <input
              className="field__input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label className="field__label">Email</label>
            <input
              className="field__input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="field__label">Password</label>
            <input
              className="field__input"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="field">
            <label className="field__label">Role</label>
            <select className="field__input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error ? <div className="login__error">{error}</div> : null}

          <button className="btn btn--primary login__submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <div className="login__meta">
            <div className="login__hint">By registering you agree to the terms.</div>
            <div>
              <button type="button" className="login__link" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
