"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // HYDRATION FLAG (THIS FIXES EVERYTHING)
  const [ready, setReady] = useState(false);

  // CONTEXT STATE
  const [otpContext, setOtpContext] = useState<"signup" | "login" | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [pendingSignup, setPendingSignup] = useState<string | null>(null);

  //READ LOCALSTORAGE ONCE, SAFELY
  useEffect(() => {
    const context = localStorage.getItem("otp_context");
    const signup = localStorage.getItem("pending_signup");
    const pendingEmail = localStorage.getItem("pending_email");

    setOtpContext(context === "signup" || context === "login" ? context : null);
    setPendingSignup(signup);
    setEmail(signup ? JSON.parse(signup).email : pendingEmail);

    setReady(true); // NOW guards may run
  }, []);

  // GUARD (RUNS ONLY AFTER READY)
  useEffect(() => {
    if (!ready) return;

    // Signup flow
    if (otpContext === "signup") {
      if (!pendingSignup || !email) {
        router.replace("/signup");
      }
    }

    // Login flow
    if (otpContext === "login") {
      if (!email) {
        router.replace("/login");
      }
    }

    // Unknown state
    if (!otpContext) {
      router.replace("/");
    }
  }, [ready, otpContext, pendingSignup, email, router]);

  const handleVerify = async () => {
    if (otp.length !== 6 || !email) return;

    setLoading(true);
    setError("");

    //VERIFY OTP
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid OTP");
      return;
    }

    // COMPLETE SIGNUP (ONLY IF SIGNUP FLOW)
    if (otpContext === "signup") {
      const signupData = JSON.parse(pendingSignup!);

      const completeRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signupData,
          mode: "complete-signup", // EXACT STRING
        }),
      });

      if (!completeRes.ok) {
        const err = await completeRes.json();
        setError(err.error || "Signup completion failed");
        return;
      }
    }

    // CLEANUP
    localStorage.removeItem("otp_context");
    localStorage.removeItem("pending_signup");
    localStorage.removeItem("pending_email");

    //  REDIRECT
    router.push("/");
    router.refresh();
  };

  // Prevent flicker before ready
  if (!ready) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-sm text-white/70">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="••••••"
          className="w-full text-center tracking-widest rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-lg outline-none focus:border-purple-400/60"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || loading}
          className="w-full rounded-xl py-3 font-medium bg-purple-500 hover:bg-purple-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
      </div>
    </div>
  );
}
