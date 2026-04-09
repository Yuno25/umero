"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (data.otpRequired) {
        localStorage.setItem("pending_email", email);
        localStorage.setItem("otp_context", "login");
        router.push("/verify-otp");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        .login-bg {
          min-height: 100vh;
          background: #080a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-bg::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(88,28,235,0.1) 0%, transparent 70%);
          top: -150px; right: -50px;
          pointer-events: none;
        }

        .login-bg::after {
          content: '';
          position: absolute;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%);
          bottom: -100px; left: -50px;
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
        }

        .login-logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.08em;
        }

        .login-logo-dot { color: #7c3aed; }

        .login-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 36px 32px;
          backdrop-filter: blur(20px);
        }

        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }

        .login-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 28px;
        }

        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
        }

        .social-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          display: flex;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 13px 16px 13px 42px;
          color: #fff;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .field-input::placeholder { color: rgba(255,255,255,0.25); }

        .field-input:focus {
          border-color: rgba(124,58,237,0.6);
          background: rgba(124,58,237,0.05);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          padding: 0;
          display: flex;
          transition: color 0.2s;
        }

        .eye-btn:hover { color: rgba(255,255,255,0.7); }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-bottom: 12px;
          padding: 10px 14px;
          background: rgba(248,113,113,0.08);
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.2);
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #5b21b6 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .submit-btn:hover::after { opacity: 1; }
        .submit-btn:hover { box-shadow: 0 8px 24px rgba(109,40,217,0.4); transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        .signup-link {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        .signup-link span {
          color: #a78bfa;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s;
        }

        .signup-link span:hover { color: #c4b5fd; }

        @media (max-width: 480px) {
          .login-box { padding: 28px 20px; }
          .social-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="login-bg">
        <div className="login-card">
          <div className="login-logo">
            <span className="login-logo-text">
              UMERO<span className="login-logo-dot">.</span>
            </span>
          </div>

          <div className="login-box">
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to your Umero account</p>

            {/* SOCIAL */}
            <div className="social-grid">
              <button
                className="social-btn"
                onClick={() => (window.location.href = "/api/auth/google")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                className="social-btn"
                onClick={() => (window.location.href = "/api/auth/outlook")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#0078D4" />
                  <path
                    d="M13 6h7v5h-7V6zm0 7h7v5h-7v-5zM4 6h8v5.5L8 14l-4-2.5V6z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M4 11.5L8 14l4-2.5V19H4v-7.5z"
                    fill="white"
                    opacity="0.7"
                  />
                </svg>
                Outlook
              </button>
              <button
                className="social-btn"
                onClick={() => (window.location.href = "/api/auth/instagram")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient
                      id="ig2"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#ig2)" />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="17" cy="7" r="1" fill="white" />
                </svg>
                Instagram
              </button>
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or with email</span>
              <div className="divider-line" />
            </div>

            <form onSubmit={handleLogin}>
              <div className="field-group">
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input"
                  />
                </div>

                <div className="field-wrap">
                  <span className="field-icon">
                    <svg
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field-input"
                    style={{ paddingRight: "42px" }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && <div className="error-msg">{error}</div>}

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Sending OTP..." : "Log in →"}
              </button>
            </form>

            <div className="signup-link">
              Don't have an account?{" "}
              <span onClick={() => router.push("/signup")}>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
