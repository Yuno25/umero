import "./globals.css";
import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "Umero | Urban Rental Platform",
  description: "Premium peer-to-peer urban rental platform",
  icons: {
    icon: [
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bgLight text-textDark dark:bg-dark dark:text-white">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
