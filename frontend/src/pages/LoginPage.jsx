import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoPng from "../assets/images/logo.png";

import "../styles/pages/login-page.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Demo auth: accept any non-empty email + password length >= 3
    if (!trimmedEmail || password.trim().length < 3) {
      setError("Enter an email and a password (min 3 chars)." );
      return;
    }

    localStorage.setItem("pm_token", "demo_token");
    navigate("/dashboard", { replace: true });
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

          <button className="btn btn--primary login__submit" type="submit">
            Login
          </button>

          <div className="login__hint">
            Demo mode: enter any email and any password with 3+ characters.
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

