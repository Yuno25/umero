"use client";

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">About Umero</h2>

        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="font-semibold mb-2">What We Do</h3>
            <p className="opacity-80">
              We connect property owners and renters through a secure,
              community-driven platform.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Why We Exist</h3>
            <p className="opacity-80">
              Renting should be simple, transparent, and built on trust.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Who It’s For</h3>
            <p className="opacity-80">
              Homeowners, renters, travelers, and anyone seeking flexibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
