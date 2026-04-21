"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const API = process.env.NEXT_PUBLIC_API_URL;
type Space = {
  id: string;
  name: string;
  area: string;
  city: string;
  type: string;
  pricePerHour: number;
  minHours: number;
  availableFrom: string;
  availableTo: string;
  capacity: number;
  sizeSqft: number;
  whatsIncluded: string;
  rules: string;
  parking: string;
  hasAC: boolean;
  hasGreenRoom: boolean;
  photos: string[];
  activities: string[];
  hostEmail: string;
};
export default function SpacePage() {
  const { id } = useParams();
  const [space, setSpace] = useState<Space | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  // Task 1 — booking state
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2026-01-01T${startTime}`);
    const end = new Date(`2026-01-01T${endTime}`);
    return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
  };

  const handleBooking = async () => {
    if (!selectedDate || !startTime || !endTime) {
      alert("Please fill in date and time.");
      return;
    }
    setBookingLoading(true);
    try {
      const hours = calculateHours();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            spaceId: space!.id,
            spaceName: space!.name,
            hostEmail: space!.hostEmail,
            renterId: "guest",
            renterEmail: "guest@umero.in",
            bookingDate: selectedDate,
            startTime: startTime,
            endTime: endTime,
            totalHours: hours,
            totalPrice: Math.round(hours * space!.pricePerHour),
          }),
        },
      );
      const data = await res.json();
      if (data.id) setBookingSuccess(true);
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await fetch(`${API}/api/spaces/${id}`);
        const data = await res.json();
        setSpace(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpace();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading space...</p>
      </div>
    );
  if (!space)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Space not found.</p>
      </div>
    );
  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* PHOTO GALLERY */}
        <div className="mb-8">
          <img
            src={space.photos?.[selectedPhoto]}
            alt={space.name}
            className="w-full h-[480px] object-cover rounded-2xl mb-3"
          />
          <div className="flex gap-3 overflow-x-auto">
            {space.photos?.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt=""
                onClick={() => setSelectedPhoto(i)}
                className={`h-20 w-28 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 transition ${
                  selectedPhoto === i
                    ? "border-black"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT — SPACE INFO */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-3">
              {space.activities?.map((act) => (
                <span
                  key={act}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 capitalize"
                >
                  {act}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-black mb-1">{space.name}</h1>
            <p className="text-gray-500 mb-6">
              {space.area}, {space.city}
            </p>
            {/* QUICK STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Capacity", value: `${space.capacity} people` },
                { label: "Min Booking", value: `${space.minHours} hrs` },
                {
                  label: "Hours",
                  value: `${space.availableFrom} – ${space.availableTo}`,
                },
                { label: "Size", value: `${space.sizeSqft} sq ft` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-gray-50 rounded-xl p-4 text-center"
                >
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-black">{s.value}</p>
                </div>
              ))}
            </div>
            {/* INCLUDED */}
            {space.whatsIncluded && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-black mb-2">
                  What's Included
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {space.whatsIncluded}
                </p>
              </div>
            )}
            {/* RULES */}
            {space.rules && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-black mb-2">
                  Rules & Restrictions
                </h2>
                <p className="text-gray-600 leading-relaxed">{space.rules}</p>
              </div>
            )}
            {/* AMENITIES */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-3">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-3">
                {space.hasAC && (
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                    AC
                  </span>
                )}
                {space.hasGreenRoom && (
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                    Green Room
                  </span>
                )}
                {space.parking && (
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                    {space.parking}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* RIGHT — BOOKING WIDGET */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 border rounded-2xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-black mb-1">
                Rs.{space.pricePerHour}
                <span className="text-base font-normal text-gray-500">
                  /hour
                </span>
              </p>
              <p className="text-sm text-gray-500 mb-5">
                Minimum {space.minHours} hours
              </p>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                      From
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                      To
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Price per hour</span>
                  <span className="font-semibold">Rs.{space.pricePerHour}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Umero fee (12%)</span>
                  <span className="font-semibold">
                    Rs.{Math.round(space.pricePerHour * 0.12)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-black mt-3">
                  <span>Total</span>
                  <span>
                    Rs.{Math.round(calculateHours() * space.pricePerHour)}
                  </span>
                </div>
              </div>
              {bookingSuccess ? (
                <div className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm text-center">
                  Booking Requested Successfully
                </div>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 transition disabled:opacity-50"
                >
                  {bookingLoading ? "Requesting..." : "Request to Book"}
                </button>
              )}
              <p className="text-xs text-gray-400 text-center mt-3">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
