"use client";

import SignupForm from "@/components/forms/SignupForm";

export default function SignupPage() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-3xl font-semibold text-white text-center">
          Create your Umero account
        </h1>
        <p className="mb-8 text-sm text-white/60 text-center">
          Your previous submissions will be linked automatically
        </p>

        <SignupForm />
      </div>
    </section>
  );
}
