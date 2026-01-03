"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function EarlyAccessListerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!formRef.current) return;

    const formData = new FormData();

    const inputs = formRef.current.querySelectorAll(
      "input, textarea"
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach((input) => {
      if (input.type === "file") {
        if (input.files) {
          Array.from(input.files).forEach((file) => {
            formData.append("photos", file);
          });
        }
      } else if (input.name && input.value) {
        formData.append(input.name, input.value);
      }
    });

    const res = await fetch("/api/early-access/lister", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Submission failed");
      return;
    }

    router.push("/submission-success");
  };

  return (
    <div ref={formRef} className="glass p-8 rounded-2xl w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Lister Early Access</h2>

      <input name="name" placeholder="Name" className="input" />
      <input name="email" placeholder="Email" className="input" />
      <input name="city" placeholder="City" className="input" />
      <input
        name="propertyType"
        placeholder="Property Type"
        className="input"
      />
      <input name="contact" placeholder="Contact" className="input" />

      {/* 📸 PHOTO UPLOAD */}
      <input
        type="file"
        name="photos"
        multiple
        accept="image/*"
        className="input mt-3"
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
