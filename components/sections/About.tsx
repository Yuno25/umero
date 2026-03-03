"use client";

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          About Umero
        </h2>

        <div className="grid gap-10 md:grid-cols-3 text-center">

          {/* WHAT WE DO */}
          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <img
              src="/logo/one.png"
              alt="What we do"
              className="w-32 h-32 mb-6 float-slow"
            />
            <h3 className="font-semibold mb-2">Discover Spaces</h3>
            <p className="opacity-80">
              Find unique spaces near you <br />
              Terraces, rooftops, studios & more — all in one place.
            </p>
          </div>

          {/* WHY WE EXIST */}
          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <img
              src="/logo/two.png"
              alt="Why we exist"
              className="w-32 h-32 mb-6 float-slow"
              style={{ animationDelay: "1s" }}
            />
            <h3 className="font-semibold mb-2">Book Easily</h3>
            <p className="opacity-80">
              Choose a space that fits your moment <br />
              Check availability, pricing & details instantly.
            </p>
          </div>

          {/* WHO IT’S FOR */}
          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
            <img
              src="/logo/three.png"
              alt="Who it's for"
              className="w-32 h-32 mb-6 float-slow"
              style={{ animationDelay: "2s" }}
            />
            <h3 className="font-semibold mb-2">Create Moments</h3>
            <p className="opacity-80">
              Celebrate, shoot, meet or host <br />
              Your space is ready — just show up and enjoy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
