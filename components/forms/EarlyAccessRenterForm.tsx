"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EarlyAccessRenterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("city", city);
    fd.append("rentalDuration", rentalDuration);
    fd.append("peopleCount", String(peopleCount));

    const res = await fetch("/api/early-access/renter", {
      method: "POST",
      body: fd, // ✅ NO headers
    });

    setLoading(false);

    if (res.ok) {
      router.push("/submission-success");
    } else {
      alert("Renter submission failed");
    }
  };

  return (
    <div className="glass p-8 rounded-2xl w-full max-w-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-2 text-white">
        Renter – Early Access
      </h2>
      <p className="text-white/60 mb-6 text-sm">
        Help us understand your rental needs early
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Rental Duration (e.g. 3 months)"
          value={rentalDuration}
          onChange={(e) => setRentalDuration(e.target.value)}
          className="input"
          required
        />

        <input
          type="number"
          min={1}
          placeholder="Number of People"
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
          className="input"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-4 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
