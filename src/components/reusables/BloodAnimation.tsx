import React from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import Solflare from './Solflare'
import { useRouter } from 'next/navigation'

export default function BloodAnimation() {
    const router = useRouter()
   
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
                router.push('/login')
             }}
             >
                Donate Now!
           </Button>
           <Button variant='link' className='text-blue-500 underline text-lg animate-bounce-up-down ease-in-out hover:text-blue-700'>
                Know more about RedBit
           </Button>

        </div>
    </div>
  )
}
