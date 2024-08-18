'use client'
import Link from "next/link"
import Navbar from "./ConnectWalletButton"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import ConnectWalletButton from "./ConnectWalletButton"



export function HomePage() {

  
 

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-xl lg:text-5xl font-bold tracking-tighter">Welcome to <span className="text-red-600">Red</span>Bit</h1>
          <p className="text-muted-foreground">Donate blood and gain bounties.</p>
          <div className="flex flex-col gap-5 justify-center items-center">
            {/* this is for connecting wallet */}
            <ConnectWalletButton />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-56">Health Officer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Input Health Officer Code</DialogTitle>
                  <DialogDescription>
                    Only authorize person can access this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="submit" variant="secondary" className="w-full bg-red-600 text-white hover:text-black hover:border">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 RedBit Inc. All rights reserved.</p>
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

