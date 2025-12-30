"use client";

import { useState, type ChangeEvent } from "react";

export default function RenterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [rentalDuration, setRentalDuration] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<string>("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 px-4">
      <div className="w-full max-w-2xl bg-slate-950 text-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Renter – Early Access</h1>
          <p className="text-slate-400">
            Get early access to rentals that match your needs
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          {/* City */}
          <input
            type="text"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
            placeholder="Preferred City"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          {/* Contact */}
          <input
            type="tel"
            value={contact}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContact(e.target.value)
            }
            placeholder="Contact Number"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />

          {/* Rental Duration */}
          <select
            value={rentalDuration}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRentalDuration(e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Rental Duration
            </option>
            <option value="short">Short Term (Days / Weeks)</option>
            <option value="monthly">Monthly</option>
            <option value="long">Long Term (6+ Months)</option>
          </select>

          {/* Number of People */}
          <select
            value={peopleCount}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPeopleCount(e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Number of People
            </option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4+">4+ People</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold hover:scale-105 transition"
          >
            Get Early Access
          </button>
        </form>
      </div>
    </div>
  );
}
