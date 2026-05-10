"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email || !otp || !password) {
      return alert("Fill all fields");
    }

    setLoading(true);

    await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, otp, password }),
    });

    setLoading(false);
    alert("Password updated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-md bg-[#020617] border border-gray-700 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 rounded-md bg-[#020617] border border-gray-700 mb-3"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded-md bg-[#020617] border border-gray-700 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* BACK TO LOGIN */}
        <p className="text-sm text-center mt-6 text-gray-400">
          Remember your password?{" "}
          <Link href="/login" className="text-white underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
