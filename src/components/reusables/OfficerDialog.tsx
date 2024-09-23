import React, { useEffect, useState } from 'react'
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
  import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'



export default function OfficerDialog() {
    const [healthCode, setHealthCode] = useState('')
    const getHealthCode = process.env.NEXT_PUBLIC_OFFICER_CODE;
    const { publicKey, connected } = useWallet();
    const [checkOfficer, setCheckOfficer] = useState(false)
    const router = useRouter()


    useEffect(() => {
        async function saveOfficer(){
            try {
                if(connected && publicKey){
                    const res = await fetch(`/api/login?publicKey=${publicKey}`,{
                        method : 'GET',
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    })
                    const data = await res.json();
                    const { pbKey } = data.publicKey;
                    if(pbKey === publicKey){
                        setCheckOfficer(true)
                    }
                    toast.success(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        saveOfficer()
    })

    const handleOfficerSubmission = async () => {
        if(healthCode === getHealthCode){

            if(!checkOfficer){
                router.push('/login/healthofficer')
            }else{
                const res = await fetch('/api/login',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        userType : 'healthofficer',
                        publicKey : publicKey
                    })
                })
                const data = await res.json();
                toast.success(data)
            }
           
        }else{
            toast.error('You are not authorized to login as a Health Officer')
        }
    }

    
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button
    className='w-96 h-20 text-2xl hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500'
    >
        Health Officer
    </Button>
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
            <Button
                onClick={handleOfficerSubmission}
                disabled={!connected}
                type="submit" variant="secondary" className="w-full bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2">
                Proceed
            </Button>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
  </Dialog>
  )
}
