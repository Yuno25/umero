"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupFormData {
  username: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState<SignupFormData>({
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    // 🔒 BASIC VALIDATION
    if (
      !form.username ||
      !form.email ||
      !form.contact ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // 🧠 TEMP STORAGE (until OTP verified)
    localStorage.setItem(
      "pending_signup",
      JSON.stringify({
        username: form.username,
        email: form.email,
        contact: form.contact,
        password: form.password,
      }),
    );

    // OTP email reference
    localStorage.setItem("pending_email", form.email);
    localStorage.setItem("otp_context", "signup");
    // SEND OTP
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        username: form.username,
        contact: form.contact,
        mode: "send-otp", // 🔴 THIS IS MANDATORY
      }),
    });

    setLoading(false);

    // MOVE TO OTP PAGE
    router.push("/verify-otp");
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#0b0f1a]/80 backdrop-blur-xl border border-white/10 p-6 text-white">
      <h1 className="text-2xl font-semibold mb-2">Create Account</h1>
      <p className="text-sm text-white/60 mb-6">
        Join Umero and complete your profile
      </p>

      <div className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
        />

        <input
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="
    nav-glow
    w-full
    py-3
    rounded-xl
    bg-purple-500
    text-white
    font-semibold
    transition-all
    hover:bg-purple-600
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
