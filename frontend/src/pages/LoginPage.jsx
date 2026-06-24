import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoPng from "../assets/images/logo.png";
import "../styles/pages/login-page.css";
import { login as loginApi } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || password.trim().length < 3) {
      setError("Enter an email and a password (min 3 chars)." );
      return;
    }

    try {
      setLoading(true);
      const data = await loginApi({ email: trimmedEmail, password });

      // Save token and basic user info
      if (data.token) localStorage.setItem("pm_token", data.token);
      localStorage.setItem("pm_user", JSON.stringify({ id: data.id, name: data.name, email: data.email }));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="login__card" role="main" aria-label="Login">
        <div className="login__brand">
          <img className="login__logo" src={logoPng} alt="ProManage" />
          <div>
            <div className="login__title">Welcome back</div>
            <div className="login__subtitle">Sign in to your workspace</div>
          </div>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error ? <div className="login__error">{error}</div> : null}

          <button className="btn btn--primary login__submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="login__meta">
            <div className="login__hint">Use your account to sign in.</div>
            <div>
              <button type="button" className="login__link" onClick={() => navigate('/register')}>Create account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

