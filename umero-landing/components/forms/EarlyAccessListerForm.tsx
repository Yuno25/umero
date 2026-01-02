"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const router = useRouter();

// after successful submit
router.push("/submission-success");

export default function EarlyAccessListerForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting...");

    const formData = new FormData(e.currentTarget);

    await fetch("/api/early-access/lister", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        item: formData.get("item"),
      }),
    });

    setStatus("You’re on the list!");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-center">
        Early Access — Listers
      </h3>

      <input
        name="name"
        placeholder="Your name"
        required
        className="w-full p-3 border rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        required
        className="w-full p-3 border rounded"
      />

      <input
        name="item"
        placeholder="What item would you list?"
        className="w-full p-3 border rounded"
      />

      <button className="w-full bg-black text-white py-3 rounded">
        Join Early Access
      </button>

      <p className="text-sm text-center">{status}</p>
    </form>
  );
}
