"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // ✅ OTP FLOW
      if (data.otpRequired) {
        localStorage.setItem("pending_email", email);
        localStorage.setItem("otp_context", "login");

        router.push("/verify-otp");
        return;
      }

      // ✅ SUCCESS LOGIN
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
        <p className="text-sm text-white/70">Log in to continue</p>
      </div>

      {/* EMAIL */}
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          w-full
          rounded-xl
          bg-white/5
          border border-white/10
          px-4 py-3
          text-white
          placeholder-white/50
          outline-none
          focus:border-purple-400/60
          focus:ring-2 focus:ring-purple-500/20
          transition
        "
      />

      {/* PASSWORD */}
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          rounded-xl
          bg-white/5
          border border-white/10
          px-4 py-3
          text-white
          placeholder-white/50
          outline-none
          focus:border-purple-400/60
          focus:ring-2 focus:ring-purple-500/20
          transition
        "
      />

      {/* ERROR */}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          py-3
          font-medium
          bg-purple-500
          hover:bg-purple-600
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      {/* SIGNUP LINK */}
      <p className="text-sm text-center text-white/70">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/signup")}
          className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
        >
          Sign up
        </span>
      </p>
    </form>
  );
}
