
import Link from "next/link"
import Navbar from "./Navbar"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Welcome to RedBit</h1>
          <p className="text-muted-foreground">Donate blood and gain bounties.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {/* this is for connecting wallet */}
            <Navbar />
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

