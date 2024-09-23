'use client'

import Link from "next/link"
import Logo from '../../../public/logo.png'
import Image from "next/image"
import ConnectWalletButton from "@/components/component/ConnectWalletButton"
import OfficerDialog from "@/components/reusables/OfficerDialog"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {

  const { publicKey, connected } = useWallet()
  const router = useRouter()

  // STATES
  const [existingParticipant, setExistingParticipant] = useState(false)
  const [existingName, setExistingName] = useState('')

  // CHECK FIRST TO WALLET IF CONNECTED AND CHECK PUBLICKEY TO SAVE PARTICIPANT DATA
  
   
  useEffect(() => {
    const checkParticipant = async () => {
      try {
            const res = await fetch(`/api/login?publicKey=${publicKey}`,{
                method : 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await res.json();
            const { pbKey, name } = data.publicKey;
            
            if(pbKey === publicKey){
                setExistingParticipant(true)
                setExistingName(name)
                // if(!existingName){
                //   router.push('/login/userdashboard')
                // }else{
                //   router.push(`/login/userdashboard/${publicKey}`)
                // }
            }
            toast.success(data)
        }
        catch (error) {
          console.log(error)
      }
    }
    checkParticipant()
  })
      
    // SAVING PARTICIPANT DATA
    const saveParticipant = async () => {
      // CHECKING OF EXISTING PARTICIPANT
        if(existingName === ''){
          router.push('/login/userdashboard')
        }
        if(!existingParticipant){
          const res = await fetch('/api/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                userType : 'donor',
                publicKey : publicKey
            })
        })
        
        const data = await res.json();
          if(res.ok){
            router.push(`/login/userdashboard/${publicKey}`)
            toast.success('Participant Saved Successfully!')
          }
        }
      
  }

  
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
            {/* Connecting Wallet  */}
              <ConnectWalletButton/>
              <OfficerDialog />

              {/* SAVING PARTICIPANT DATA */}
              <Button
              disabled={!connected}
              onClick={saveParticipant}
              >
                Donate Now!
              </Button>
           
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