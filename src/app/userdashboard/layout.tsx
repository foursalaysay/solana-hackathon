import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PublicKeyProvider } from "@/components/context/PublicKeyContext";


const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <PublicKeyProvider>
              {children}
          </PublicKeyProvider>
        </body>
    </html>
  );
}
