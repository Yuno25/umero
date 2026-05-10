"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) return alert("Enter email");

    setLoading(true);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    alert("OTP sent if email exists");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-md bg-[#020617] border border-gray-700 mb-4 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
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
