"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EarlyAccessRenterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    rentalDuration: "",
    peopleCount: 1,
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/early-access/renter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Submission failed");
      return;
    }

    router.push("/submission-success");
  };

  return (
    <div className="glass p-8 rounded-2xl w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Renter Early Access</h2>

      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="input"
      />

      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="input"
      />

      <input
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        className="input"
      />

      <input
        placeholder="Rental Duration"
        value={formData.rentalDuration}
        onChange={(e) =>
          setFormData({ ...formData, rentalDuration: e.target.value })
        }
        className="input"
      />

      <input
        type="number"
        min={1}
        placeholder="Number of People"
        value={formData.peopleCount}
        onChange={(e) =>
          setFormData({
            ...formData,
            peopleCount: Number(e.target.value),
          })
        }
        className="input"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="btn-primary w-full mt-4"
      >
        Submit
      </button>
    </div>
  );
}
