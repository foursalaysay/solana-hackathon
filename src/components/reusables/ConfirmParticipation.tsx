import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { usePublicKey } from '../context/PublicKeyContext'
import { toast } from 'sonner'
  

  
export default async function ConfirmParticipation() {
  const publicKey = usePublicKey();
  try {
    const saveParticipation = await fetch(`/api/userdashboard/${publicKey}`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      }
    });

    if(saveParticipation.ok){
      toast.success('You are listed for donation');
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <>
        <Dialog>
          <DialogTrigger asChild>
              <Button variant="default" className='w-full bg-red-600 hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'>Participate</Button>
          </DialogTrigger>
          <DialogContent className="w-[320px] lg:w-96 rounded-md">
              <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                  Are you sure you want to participate in donating blood?
              </DialogDescription>
              </DialogHeader>
              <Separator />
              <DialogFooter className="flex flex-col gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" className=' w-full hover:bg-gray-200'>
                      Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" className='w-full bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'>
                      Confirm
                    </Button>
                </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  )
}
