"use client";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";

export default function ListerPage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const [propertyType, setPropertyType] = useState<string>("");
  const [otherPropertyType, setOtherPropertyType] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [photos, setPhotos] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalPropertyType =
      propertyType === "other" ? otherPropertyType : propertyType;

    const formData = new FormData();

    formData.append("type", "lister");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("contact", contact);
    formData.append("propertyType", finalPropertyType);
    formData.append("address", address);

    if (photos) {
      Array.from(photos).forEach((file) => {
        formData.append("photos", file);
      });
    }

    const res = await fetch("/api/early-access/lister", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("submissionId", result.submissionId);
      router.push("/submission-success");
    } else {
      alert("Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 px-4">
      <div className="w-full max-w-2xl bg-slate-950 text-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Property Owner – Early Access
          </h1>
          <p className="text-slate-400">
            List your property early and be among the first to host on Umero
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact Number"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          {/* Property Type */}
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Select Space Type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="PG / Shared">PG / Shared</option>
            <option value="Independent House">Independent House</option>
            <option value="other">Other</option>
          </select>

          {/* Show only if Other selected */}
          {propertyType === "other" && (
            <input
              type="text"
              value={otherPropertyType}
              onChange={(e) => setOtherPropertyType(e.target.value)}
              placeholder="Specify property type (Shop, Open Plot, Warehouse...)"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-indigo-500 focus:outline-none"
            />
          )}

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Property Address"
            rows={3}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none"
          />

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Upload Property Photos
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setPhotos(e.target.files)}
              className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
