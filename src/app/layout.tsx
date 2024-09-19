import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RedBit",
  description: "Generated by create next app",
};


// const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      {/* <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${GoogleApiKey}&libraries=places`}
      ></script> */}
      </head>
        <body className={inter.className}>
              {children}
              <Toaster />
          </body>
    </html>
  );
}
