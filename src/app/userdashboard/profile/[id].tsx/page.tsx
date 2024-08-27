import React from 'react'
import Image from 'next/image'
import ProfileImage from '../../../../../public/logo.png'
import { Separator } from '@/components/ui/separator'



export default function UserProfile() {
  return (
    <div className='flex flex-col'>
        <Image
        src={ProfileImage}
        alt="profile"
        className='rounded-full w-24 h-24'
        />
       <div className='flex flex-col justify-start'>
         <h3>Personal Information</h3>
         <Separator />
       </div>
    </div>
  )
}
