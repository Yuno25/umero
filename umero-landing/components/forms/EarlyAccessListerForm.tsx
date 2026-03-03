"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

type PreviewPhoto = {
  file: File;
  preview: string;
};

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

  /* ================= PRICING ================= */
  const [pricingType, setPricingType] = useState<
    "" | "hourly" | "daily" | "monthly"
  >("");

  const [hourlyDetails, setHourlyDetails] = useState({
    pricePerHour: "",
    minHours: "",
    openFromHour: 9,
    openFromPeriod: "AM" as "AM" | "PM",
    openToHour: 6,
    openToPeriod: "PM" as "AM" | "PM",
  });

  /* ================= PHOTOS ================= */
  const [photos, setPhotos] = useState<PreviewPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const residentialTypes = [
    "Apartment",
    "Villa",
    "Independent House",
    "PG / Shared",
  ];

  /* ================= HELPERS ================= */
  const formatTime = (hour: number, period: "AM" | "PM") => {
    let h = hour % 12;
    if (h === 0) h = 12;
    return `${h}:00 ${period}`;
  };

  /* ================= PHOTO HANDLERS ================= */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhotos: PreviewPhoto[] = Array.from(e.target.files).map(
      (file) => ({
        file,
        preview: URL.createObjectURL(file),
      })
    );

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [photos]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pricingType) {
      alert("Please select how you want to rent the space");
      return;
    }

    if (
      pricingType === "hourly" &&
      (!hourlyDetails.pricePerHour || !hourlyDetails.minHours)
    ) {
      alert("Please fill hourly pricing details");
      return;
    }

    if (photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("city", city);
    fd.append("contact", contact);
    fd.append(
      "propertyType",
      propertyType === "Other" ? otherProperty : propertyType
    );
    fd.append("pricingType", pricingType);

    if (pricingType === "hourly") {
      fd.append("pricePerHour", hourlyDetails.pricePerHour);
      fd.append("minHours", hourlyDetails.minHours);
      fd.append(
        "openFrom",
        formatTime(hourlyDetails.openFromHour, hourlyDetails.openFromPeriod)
      );
      fd.append(
        "openTo",
        formatTime(hourlyDetails.openToHour, hourlyDetails.openToPeriod)
      );
    }

    photos.forEach(({ file }) => fd.append("photos", file));

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
          className="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="input"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="input bg-black/40 text-white border border-white/10 
             focus:ring-2 focus:ring-purple-500
             [&>option]:bg-[#0b1220] [&>option]:text-white"
        >
          <option value="">Select Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>PG / Shared</option>
          <option>Independent House</option>
          <option value="Other">Other (Shop / Ground / Workshop)</option>
        </select>

        {propertyType === "Other" && (
          <input
            className="input"
            placeholder="Specify property type"
            value={otherProperty}
            onChange={(e) => setOtherProperty(e.target.value)}
          />
        )}

        {/* ===== PRICING TYPE ===== */}
        <div className="flex gap-3">
          {["hourly", "daily", "monthly"].map((type) => {
            const hourlyDisabled =
              type === "hourly" && residentialTypes.includes(propertyType);

            return (
              <button
                key={type}
                type="button"
                disabled={hourlyDisabled}
                onClick={() => setPricingType(type as any)}
                className={`px-4 py-2 rounded-xl text-sm capitalize
                  ${
                    pricingType === type
                      ? "bg-purple-500/20 border border-purple-400 text-white"
                      : "bg-white/5 border border-white/10 text-white/60"
                  }
                  ${hourlyDisabled ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* ===== HOURLY UI WITH TIME SLOTS ===== */}
        {pricingType === "hourly" && (
          <div className="mt-3 p-5 rounded-2xl border border-white/10 bg-black/30 space-y-4">
            <input
              className="input"
              placeholder="Price per hour (₹)"
              type="number"
              value={hourlyDetails.pricePerHour}
              onChange={(e) =>
                setHourlyDetails({
                  ...hourlyDetails,
                  pricePerHour: e.target.value,
                })
              }
            />
            <input
              className="input"
              placeholder="Minimum booking hours"
              type="number"
              value={hourlyDetails.minHours}
              onChange={(e) =>
                setHourlyDetails({ ...hourlyDetails, minHours: e.target.value })
              }
            />

            {[
              { label: "From", hour: "openFromHour", period: "openFromPeriod" },
              { label: "To", hour: "openToHour", period: "openToPeriod" },
            ].map(({ label, hour, period }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-white/70 w-12 text-sm">{label}</span>
                <select
                  className="bg-black/40 text-white px-3 py-2 rounded-lg border border-white/10"
                  value={(hourlyDetails as any)[hour]}
                  onChange={(e) =>
                    setHourlyDetails((prev) => ({
                      ...prev,
                      [hour]: Number(e.target.value),
                    }))
                  }
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                {["AM", "PM"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setHourlyDetails((prev) => ({
                        ...prev,
                        [period]: p,
                      }))
                    }
                    className={`px-3 py-2 text-xs rounded-lg border
                      ${
                        (hourlyDetails as any)[period] === p
                          ? "bg-purple-500/30 border-purple-400 text-white"
                          : "bg-white/5 border-white/10 text-white/60"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ===== PHOTOS ===== */}
        <input
          type="file"
          id="photoUpload"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <label
          htmlFor="photoUpload"
          className="btn-primary w-full text-center cursor-pointer"
        >
          {photos.length > 0
            ? `Choose Photos (${photos.length} selected)`
            : "Choose Photos"}
        </label>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.preview}
                  className="h-24 w-full object-cover rounded-xl"
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
          type="submit"
          disabled={loading || photos.length === 0}
          className="btn-primary w-full mt-4 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
