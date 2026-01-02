"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SubmissionSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#050510] to-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-center"
      >
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-14 w-14 text-purple-400" />
        </div>

        {/* HEADING */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Submission Successful
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-white/70 mb-8">
          Your request has been submitted successfully. Create an account to
          track status, manage details, and receive updates. Welcome to Umero!
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col gap-4">
          {/* PRIMARY CTA */}
          <Link
            href="/auth/signup"
            className="w-full rounded-lg bg-purple-500/90 hover:bg-purple-500 text-white py-3 text-sm font-semibold transition-all"
          >
            Create Account / Login
          </Link>

          {/* SECONDARY CTA */}
          <Link
            href="/"
            className="w-full rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/30 py-3 text-sm font-medium transition-all"
          >
            Go Back Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
