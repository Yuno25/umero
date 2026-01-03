"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function EarlyAccessListerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  // ✅ store selected photos
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ handle file selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPhotos((prev) => [...prev, ...Array.from(e.target.files)]);
    e.target.value = ""; // reset input
  };

  // ✅ remove selected photo
  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formRef.current) return;
    setLoading(true);

    const formData = new FormData();

    const inputs = formRef.current.querySelectorAll(
      "input:not([type='file']), textarea"
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach((input) => {
      if (input.name && input.value) {
        formData.append(input.name, input.value);
      }
    });

    // ✅ append photos properly
    photos.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const res = await fetch("/api/early-access/lister", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      router.push("/submission-success");
    } catch (err) {
      alert("Submission failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        accept="image/*"
        multiple
        onChange={handlePhotoChange}
        className="input mt-3"
      />

      {/* 🖼️ PHOTO PREVIEW + DELETE */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border border-white/10"
            >
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="h-24 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="btn-primary w-full mt-4"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
