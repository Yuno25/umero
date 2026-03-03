import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function EarlyAccessPage() {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="glass max-w-3xl w-full rounded-3xl p-10 text-center space-y-10">
          <h1 className="text-3xl font-bold text-white">Get Early Access</h1>
          <p className="text-gray-300">Choose how you want to join Umero</p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/early-access/lister" className="btn-glass font-bold">
              I am a Lister
            </Link>

            <Link href="/early-access/renter" className="btn-glass font-bold">
              I am a Renter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
