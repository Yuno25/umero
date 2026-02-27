import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyUmero from "@/components/sections/WhyUmero";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";
import ReachUs from "@/components/sections/ReachUs";
import HomeClient from "@/components/HomeClient";




export default function HomePage() {
  return (
    <>
      {/* <HomeClient /> */}
      <Hero />
      <About />
      <WhyUmero />
      <EarlyAccessSection />
      <ReachUs />
    </>
  );
}
