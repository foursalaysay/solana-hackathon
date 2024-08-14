
import Link from "next/link"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          {/* <MountainIcon className="size-6" /> */}
          <span className="sr-only">RedBit</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Welcome to Acme Inc</h1>
          <p className="text-muted-foreground">Discover our innovative products and services.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Explore Products
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Contact Us
            </Link>
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

