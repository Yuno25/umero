"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function EarlyAccessListerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  /* ================= FORM STATE ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  const [propertyType, setPropertyType] = useState("");
  const [otherProperty, setOtherProperty] = useState("");

  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= PHOTO HANDLERS ================= */

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    console.log("Selected photos:", selectedFiles); // 🔍 debug

    setPhotos((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ SAFETY CHECK (prevents empty uploads)
    if (photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("city", city);
    fd.append(
      "propertyType",
      propertyType === "Other" ? otherProperty : propertyType
    );
    fd.append("contact", contact);

    photos.forEach((file) => {
      fd.append("photos", file);
    });

    const res = await fetch("/api/early-access/lister", {
      method: "POST",
      body: fd,
    });

    setLoading(false);

    if (res.ok) router.push("/submission-success");
    else alert("Submission failed");
  };

  /* ================= UI ================= */

  return (
    <div
      ref={formRef}
      className="glass p-8 rounded-2xl w-full max-w-lg border border-white/10"
    >
      <h2 className="text-2xl font-semibold mb-2 text-white">
        Property Owner – Early Access
      </h2>
      <p className="text-white/60 mb-6 text-sm">
        List your property early and be among the first to host on Umero
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Full Name"
          className="input focus:ring-2 focus:ring-purple-500/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="input focus:ring-2 focus:ring-purple-500/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="City"
          className="input focus:ring-2 focus:ring-purple-500/40"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          placeholder="Contact Number"
          className="input focus:ring-2 focus:ring-purple-500/40"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        {/* PROPERTY TYPE */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="input bg-[#0b1220] text-white 
                     focus:ring-2 focus:ring-purple-500/40
                     [&>option]:bg-[#0b1220] [&>option]:text-white"
          required
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="PG / Shared">PG / Shared</option>
          <option value="Independent House">Independent House</option>
          <option value="Other">Other (Shop / Ground / Workshop)</option>
        </select>

        {propertyType === "Other" && (
          <input
            placeholder="Specify property type"
            className="input focus:ring-2 focus:ring-purple-500/40"
            value={otherProperty}
            onChange={(e) => setOtherProperty(e.target.value)}
            required
          />
        )}

        {/* PHOTO UPLOAD */}
        <div className="mt-2">
          <p className="text-xs text-white/60 mb-2">Upload Property Photos</p>

          {/* 🔥 FIX: name="photos" */}
          <input
            type="file"
            id="photoUpload"
            name="photos" // ✅ REQUIRED
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="hidden"
          />

          <label
            htmlFor="photoUpload"
            className="
              flex items-center justify-center
              cursor-pointer rounded-xl px-4 py-3
              bg-purple-600 hover:bg-purple-700
              text-white font-medium
              shadow-lg shadow-purple-600/30
              transition-all
            "
          >
            Choose Photos
          </label>

          {photos.length > 0 && (
            <p className="text-xs text-purple-400 mt-2">
              {photos.length} photo{photos.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* PHOTO PREVIEW */}
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
                  className="absolute top-1 right-1 bg-black/70 text-white
                             rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

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
