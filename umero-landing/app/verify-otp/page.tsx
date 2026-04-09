"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120; // 2 minutes

export default function VerifyOTPPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const [otpContext, setOtpContext] = useState<"signup" | "login" | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [pendingSignup, setPendingSignup] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const context = localStorage.getItem("otp_context");
    const signup = localStorage.getItem("pending_signup_data");
    const pendingEmail = localStorage.getItem("pending_email");

    setOtpContext(context === "signup" || context === "login" ? context : null);
    setPendingSignup(signup);
    setEmail(pendingEmail);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (otpContext === "signup" && (!pendingSignup || !email)) {
      router.replace("/signup");
      return;
    }
    if (otpContext === "login" && !email) {
      router.replace("/login");
      return;
    }
    if (!otpContext) router.replace("/");
  }, [ready, otpContext, pendingSignup, email, router]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    timerRef.current = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resendTimer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];

    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = digits[i] || "";
      }
      setOtp(newOtp);
      inputRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpString = otp.join("");

  const handleResend = async () => {
    if (resendTimer > 0 || !email) return;
    setResending(true);
    setResendSuccess(false);
    setError("");

    try {
      const endpoint =
        otpContext === "login" ? "/api/auth/login" : "/api/auth/signup";
      const body =
        otpContext === "login"
          ? {
              email,
              password: JSON.parse(pendingSignup || "{}").password || "",
            }
          : {
              email,
              password: JSON.parse(pendingSignup || "{}").password,
              mode: "send-otp",
            };

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setResendSuccess(true);
      setResendTimer(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP. Try again.");
    } finally {
      setResending(false);
    }
  };

  const handleVerify = async () => {
    if (otpString.length !== OTP_LENGTH || !email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      if (otpContext === "signup") {
        const signupData = JSON.parse(pendingSignup!);
        const completeRes = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: signupData.password,
            username: signupData.username,
            contact: signupData.contact,
            mode: "complete-signup",
          }),
        });

        if (!completeRes.ok) {
          const err = await completeRes.json();
          setError(err.error || "Signup completion failed");
          setLoading(false);
          return;
        }
      }

      localStorage.removeItem("otp_context");
      localStorage.removeItem("pending_signup_data");
      localStorage.removeItem("pending_email");

      await refreshAuth();
      router.push("/");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        .otp-bg {
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

        .otp-bg::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(88,28,235,0.1) 0%, transparent 70%);
          top: -150px; right: -50px;
          pointer-events: none;
        }

        .otp-card {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 1;
        }

        .otp-logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .otp-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.08em;
        }

        .otp-logo-dot { color: #7c3aed; }

        .otp-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 36px 32px;
          backdrop-filter: blur(20px);
        }

        .otp-icon {
          width: 52px; height: 52px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #a78bfa;
        }

        .otp-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
        }

        .otp-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 28px;
          line-height: 1.5;
        }

        .otp-email {
          color: #a78bfa;
          font-weight: 500;
        }

        .otp-inputs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .otp-input {
          width: 48px;
          height: 56px;
          text-align: center;
          font-size: 22px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          outline: none;
          transition: all 0.2s;
          caret-color: #7c3aed;
        }

        .otp-input:focus {
          border-color: rgba(124,58,237,0.7);
          background: rgba(124,58,237,0.07);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
        }

        .otp-input.filled {
          border-color: rgba(124,58,237,0.4);
          background: rgba(124,58,237,0.05);
        }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-bottom: 16px;
          padding: 10px 14px;
          background: rgba(248,113,113,0.08);
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.2);
        }

        .success-msg {
          font-size: 12px;
          color: #4ade80;
          margin-bottom: 16px;
          padding: 10px 14px;
          background: rgba(74,222,128,0.08);
          border-radius: 10px;
          border: 1px solid rgba(74,222,128,0.2);
        }

        .verify-btn {
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
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .verify-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .verify-btn:hover::after { opacity: 1; }
        .verify-btn:hover { box-shadow: 0 8px 24px rgba(109,40,217,0.4); transform: translateY(-1px); }
        .verify-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

        .resend-area {
          text-align: center;
        }

        .resend-timer {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        .timer-badge {
          display: inline-block;
          padding: 2px 10px;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #a78bfa;
          margin-left: 6px;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.05em;
        }

        .resend-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #a78bfa;
          font-family: 'Inter', sans-serif;
          transition: color 0.2s;
          padding: 0;
        }

        .resend-btn:hover { color: #c4b5fd; }
        .resend-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 480px) {
          .otp-box { padding: 28px 20px; }
          .otp-input { width: 42px; height: 50px; font-size: 18px; }
          .otp-inputs { gap: 8px; }
        }
      `}</style>

      <div className="otp-bg">
        <div className="otp-card">
          <div className="otp-logo">
            <span className="otp-logo-text">
              UMERO<span className="otp-logo-dot">.</span>
            </span>
          </div>

          <div className="otp-box">
            <div className="otp-icon">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <h1 className="otp-title">Check your email</h1>
            <p className="otp-subtitle">
              We sent a 6-digit code to{" "}
              <span className="otp-email">{email}</span>
            </p>

            {/* OTP INPUTS */}
            <div className="otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  className={`otp-input${digit ? " filled" : ""}`}
                />
              ))}
            </div>

            {error && <div className="error-msg">{error}</div>}
            {resendSuccess && (
              <div className="success-msg">✓ New OTP sent to your email</div>
            )}

            <button
              onClick={handleVerify}
              disabled={otpString.length !== OTP_LENGTH || loading}
              className="verify-btn"
            >
              {loading ? "Verifying..." : "Verify & Continue →"}
            </button>

            <div className="resend-area">
              {resendTimer > 0 ? (
                <p className="resend-timer">
                  Resend code in
                  <span className="timer-badge">{formatTime(resendTimer)}</span>
                </p>
              ) : (
                <p className="resend-timer">
                  Didn't receive it?{" "}
                  <button
                    className="resend-btn"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? "Sending..." : "Resend OTP"}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
