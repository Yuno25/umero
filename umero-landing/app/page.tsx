import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyUmero from "@/components/sections/WhyUmero";
import EventSection from "@/components/sections/EventSection";
import ReachUs from "@/components/sections/ReachUs";
import HomeClient from "@/components/HomeClient";
import HostSection from "@/components/sections/HostSection";

export default function HomePage() {
  return (
    <>
      {/* <HomeClient /> */}
      <Hero />
      <About />
      <WhyUmero />
      <HostSection />
      <EventSection />
      <ReachUs />
    </>
  );
}
