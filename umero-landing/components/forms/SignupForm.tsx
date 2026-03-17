"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ REDIRECT AFTER SUCCESS
        router.push("/");
        router.refresh();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Something went wrong");
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

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur"
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

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-purple-500 to-purple-600
              hover:from-purple-400 hover:to-purple-500
              transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>

          {/* SIGN IN LINK */}
          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Input({
  name,
  placeholder,
  type = "text",
  onChange,
}: {
  name: string;
  placeholder: string;
  type?: string;
  onChange: (e: any) => void;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
      text-white placeholder-gray-500
      focus:outline-none focus:border-purple-500
      focus:ring-2 focus:ring-purple-500/20
      transition"
    />
  );
}
