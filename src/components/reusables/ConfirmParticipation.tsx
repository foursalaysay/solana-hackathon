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
import { CopyIcon } from 'lucide-react'

  
export default function ConfirmParticipation() {
  return (
    <>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className=''>Participate</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                Close
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
