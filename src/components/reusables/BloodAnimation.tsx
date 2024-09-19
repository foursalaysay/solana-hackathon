import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import Solflare from './Solflare'
import { useRouter } from 'next/navigation'
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

export default function BloodAnimation() {
    const [healthCode, setHealthCode] = useState('')
    const router = useRouter()
    const getHealthCode = process.env.NEXT_PUBLIC_OFFICER_CODE;



    const saveOfficer = async () => {
      try {
        const res = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userType : 'HealthOfficer'
          }),
        });
    
        const result = await res.json();
        if(res.ok){
          toast.success('Officer Saved!')
          router.push('/login')
        }
        console.log(result); // Handle the API response here
      } catch (error) {
        console.error('Error saving officer:', error);
      }
    };

    const saveUser = async () => {
      try {
        const res = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userType : 'Participant'
          }),
        });
    
        const result = await res.json();
        if(res.ok){
          toast.success('Participant Saved!')
          router.push('/login')
        }
        console.log(result); // Handle the API response here
      } catch (error) {
        console.error('Error saving officer:', error);
      }
    };

    const handleOfficerSubmission = () => {
      if(healthCode === getHealthCode) {
        saveOfficer();
      } else {
        toast.error('Invalid Health Officer Code');
      }
    }
   
  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-3'>
            <iframe
            className='w-96 h-96 border-2 rounded-full'
            src="https://lottie.host/embed/f74f16aa-820c-4605-ae89-1a4e7a3c6294/pCdZpth0FF.json">
            </iframe>
            <h1 className='text-5xl font-bold'><span className='text-red-500'>Red</span>Bit</h1>
            <Button
             className='w-96 h-20 text-2xl hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500'
             onClick={() => {
                saveUser()
                router.push('/login')
             }}
             >
                Donate Now!
           </Button>
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
                      type="submit" variant="secondary" className="w-full bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2">
                      Proceed
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
           <Button variant='link' className='text-blue-500 underline text-lg animate-bounce-up-down ease-in-out hover:text-blue-700'>
                Know more about RedBit
           </Button>

        </div>
    </div>
  )
}
