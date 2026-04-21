"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HostDashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch host bookings
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/api/bookings/host/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .finally(() => setLoading(false));
  }, [user]);

  // 🔥 Handle approve / decline
  const handleAction = async (id: string, action: "approve" | "decline") => {
    try {
      const res = await fetch(`${API}/api/bookings/${id}/${action}`, {
        method: "PUT",
      });

      const updated = await res.json();

      // 🔥 instant UI update
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
    } catch {
      alert("Action failed");
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen pt-40 flex justify-center">
        Please login
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-40 flex justify-center">Loading...</main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-40 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Host Dashboard</h1>

        {bookings.length === 0 && (
          <p className="text-gray-500">No booking requests yet.</p>
        )}

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-2xl p-5 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="font-semibold text-black text-lg">
                    {b.spaceName}
                  </h2>
                  <p className="text-sm text-gray-500">{b.renterEmail}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    b.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <p>Date: {b.bookingDate}</p>
                <p>
                  Time: {b.startTime} – {b.endTime}
                </p>
                <p>Duration: {b.totalHours} hrs</p>
                <p className="font-semibold text-black">
                  Earning: ₹{Math.round(b.totalPrice * 0.88)}
                </p>
              </div>

              {/* Actions */}
              {b.status === "PENDING" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(b.id, "approve")}
                    className="flex-1 bg-black text-white py-2 rounded-xl text-sm font-semibold hover:bg-gray-900 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleAction(b.id, "decline")}
                    className="flex-1 border border-black text-black py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
