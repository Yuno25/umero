import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";
import ReachUs from "@/components/sections/ReachUs";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <About />
      <EarlyAccessSection />
      <ReachUs />
    </Layout>
  );
}
