import { Inter } from "next/font/google";
import Navbar from "@/components/reusables/Navbar";


const inter = Inter({ subsets: ["latin"] });

export default function HealthOfficerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Navbar />
                {children}
        </body>
    </html>
  );
}
