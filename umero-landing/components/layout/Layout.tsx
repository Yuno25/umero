import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6">{children}</main>
      <footer className="border-t mt-24 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Umero · Early Access
      </footer>
    </>
  );
}
