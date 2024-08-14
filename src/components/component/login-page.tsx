
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoginPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-background px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          {/* <MountainIcon className="h-6 w-6" /> */}
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-muted-foreground text-sm lg:text-xl">Enter your username and password to login to your account</p>
          </div>
          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full p-5">
              Login
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                {/* <ChromeIcon className="mr-2 h-4 w-4" /> */}
                Login with Google
              </Button>
              <Button variant="outline" className="w-full">
                {/* <FacebookIcon className="mr-2 h-4 w-4" /> */}
                Login with Facebook
              </Button>
            </div>
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
