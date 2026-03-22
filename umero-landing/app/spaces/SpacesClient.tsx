"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

type Space = {
  id: string;
  name: string;
  city: string;
  area: string;
  pricePerHour: number;
  photos: string[];
  activities: string[];
  type: string;
  capacity: number;
  minHours: number;
};

export default function SpacesClient() {
  const searchParams = useSearchParams();
  const activity = searchParams.get("activity") || "any";
  const location = searchParams.get("location") || "Delhi";

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(
          `${API}/api/spaces?activity=${activity}&location=${location}`,
        );
        const data = await res.json();
        setSpaces(data);
      } catch (err) {
        console.error("Failed to fetch spaces", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, [activity, location]);

  if (loading)
    return (
      <main className="min-h-screen bg-white px-4 pt-36 pb-16">
        <p className="text-center text-gray-500 pt-20">Loading spaces...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-white px-4 pt-36 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-black mb-2 text-center">
          Spaces for "{activity}"
        </h1>
        <p className="text-gray-600 text-center mb-10">
          {spaces.length} spaces available in {location}
        </p>

        {spaces.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No spaces found. More coming soon.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <Link href={`/spaces/${space.id}`} key={space.id}>
              <div
                className="border rounded-2xl bg-white overflow-hidden
                shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={space.photos?.[0] || ""}
                  alt={space.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-black mb-1">
                    {space.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">{space.area}</p>
                  <p className="text-sm text-gray-600 mb-3">{space.city}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.activities?.map((act) => (
                      <span
                        key={act}
                        className="px-3 py-1 text-xs rounded-full
                          bg-gray-100 text-gray-700 capitalize"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-black">
                      ₹{space.pricePerHour}/hr
                    </span>
                    <span
                      className="px-4 py-2 rounded-lg bg-black
                      text-white text-sm"
                    >
                      View Space
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
