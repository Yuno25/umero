"use client";

import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold text-white text-center">
          Welcome back
        </h1>
        <p className="mb-8 text-sm text-white/60 text-center">
          Login to access your Umero account
        </p>

        <LoginForm />
      </div>
    </section>
  );
}
