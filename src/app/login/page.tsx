'use client'

import Link from "next/link"

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


import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Logo from '../../../public/logo.png'
import Image from "next/image"
import ConnectWalletButton from "@/components/component/ConnectWalletButton"
import { Button } from "@/components/ui/button"

export default function LoginPage() {


const getHealthCode = process.env.NEXT_PUBLIC_OFFICER_CODE;
const [healthCode, setHealthCode ] = useState("");
const router = useRouter();

useEffect(() => {
  if(getHealthCode === healthCode){
    router.push("/healthofficer")
  }
})

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center flex flex-col items-center">
        <Image
              src={Logo}
              width={150}
              height={150}
              alt="logo"
              />
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter">Welcome to <span className="text-red-600">Red</span>Bit</h1>
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
                      value={healthCode}
                      onChange={(e) => setHealthCode(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="submit" variant="secondary" className="w-full bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2">
                      Proceed
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

