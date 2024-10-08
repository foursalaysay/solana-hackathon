import { Inter } from "next/font/google";
import { PublicKeyProvider } from "@/components/context/PublicKeyContext";
import Navbar from "@/components/reusables/Navbar";


const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
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
