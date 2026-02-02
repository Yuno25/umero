"use client";

import { useSearchParams } from "next/navigation";

const DUMMY_SPACES = [
  {
    id: 1,
    name: "Creative Photo Loft",
    city: "Delhi",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
    ],
    activities: ["photography", "videography", "shoot"],
  },
  {
    id: 2,
    name: "Open Garden Space",
    city: "Pune",
    price: 1500,
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    ],
    activities: ["birthday", "party", "photography"],
  },
  {
    id: 3,
    name: "Sky Rooftop Venue",
    city: "Mumbai",
    price: 2000,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    ],
    activities: ["birthday", "party"],
  },
  {
    id: 4,
    name: "Podcast Studio Pro",
    city: "Bangalore",
    price: 1000,
    images: [
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      "https://images.unsplash.com/photo-1604014237744-2f4ab6bfbf58",
    ],
    activities: ["podcast", "videography"],
  },
];

export default function SpacesPage() {
  const searchParams = useSearchParams();
  const activity = searchParams.get("activity")?.toLowerCase();

  const filteredSpaces = DUMMY_SPACES.filter((space) =>
    activity ? space.activities.includes(activity) : true
  );

  return (
    <main className="min-h-screen bg-white px-4 pt-36 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-semibold text-black mb-2 text-center">
          Spaces for &quot;{activity}&quot;
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {filteredSpaces.length} spaces available
        </p>

        {/* DEMO BILLBOARD */}
        <div className="overflow-hidden border-y border-gray-200 py-3 mb-10">
          <div className="whitespace-nowrap animate-marquee text-gray-500 text-sm tracking-widest text-center">
            🚧 THIS IS A DEMO LISTING — REAL SPACES COMING SOON. STAY TUNED 🚧
          </div>
        </div>

        {/* NO RESULTS */}
        {filteredSpaces.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No spaces found for this activity.
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={space.images[0]}
                alt={space.name}
                className="h-56 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-black mb-1">
                  {space.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{space.city}</p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {space.activities.map((act) => (
                    <span
                      key={act}
                      className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 capitalize"
                    >
                      {act}
                    </span>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-black">
                    ₹{space.price}/hour
                  </span>
                  <button className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
                    View Space
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
