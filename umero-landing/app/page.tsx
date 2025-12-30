import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ReachUs from "@/components/sections/ReachUs";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <ReachUs />
      <EarlyAccessSection />
    </>
  );
}
