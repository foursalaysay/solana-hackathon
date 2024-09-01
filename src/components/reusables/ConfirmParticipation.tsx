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
  

  
export default function ConfirmParticipation() {
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
                    <Button type="button" variant="secondary" className='hover:bg-gray-200 w-28'>
                      Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" className='w-28 bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'>
                      Confirm
                    </Button>
                </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  )
}
