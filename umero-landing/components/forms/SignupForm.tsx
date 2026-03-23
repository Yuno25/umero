"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    // ✅ password check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending OTP request...");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          mode: "send-otp",
        }),
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // ✅ STORE DATA FOR NEXT STEP
      localStorage.setItem("pending_email", form.email);
      localStorage.setItem("otp_context", "signup");

      // IMPORTANT: match backend naming
      localStorage.setItem(
        "pending_signup_data",
        JSON.stringify({
          username: form.username,
          contact: form.phone, // 👈 FIXED
          password: form.password,
        }),
      );

      console.log("Redirecting to /verify-otp");

      // ✅ HARD REDIRECT (guaranteed)
      window.location.href = "/verify-otp";
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Create your <span className="text-purple-400">Umero</span> account
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Your previous submissions will be linked automatically
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            <Input
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
            <Input
              name="phone"
              placeholder="Contact Number"
              onChange={handleChange}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-purple-500 to-purple-600"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Input({ name, placeholder, type = "text", onChange }: any) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
      text-white placeholder-gray-500 focus:border-purple-500"
    />
  );
}
