"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";

const API = process.env.NEXT_PUBLIC_API_URL;

const statusStyle: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  DECLINED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`${API}/api/bookings/renter/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen pt-40 flex justify-center">
        Please login to view bookings
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-40 flex justify-center">
        Loading bookings...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-40 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">My Bookings</h1>

        {bookings.length === 0 && (
          <p className="text-gray-500">No bookings yet.</p>
        )}

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-2xl p-5 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-black text-lg">
                  {b.spaceName}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[b.status]}`}
                >
                  {b.status}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p>Date: {b.bookingDate}</p>
                <p>
                  Time: {b.startTime} – {b.endTime}
                </p>
                <p>Duration: {b.totalHours} hrs</p>
                <p className="font-semibold text-black">
                  Total: ₹{b.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
