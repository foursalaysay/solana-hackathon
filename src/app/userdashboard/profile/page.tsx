import React from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import  ProfileImage  from '../../../../public/blood.png'


export default function UserProfilePage() {
  return (
    <div className='flex flex-col p-10 pt-20 gap-5'>
        <Image
        src={ProfileImage}
        alt="profile"
        className='rounded-full w-24 h-24 self-center m-10'
        />
       <div className='flex flex-col justify-start gap-5'>
         <h2 className='text-4xl font-bold'>Personal Information</h2>
         <Separator />
       </div>
       <div className='flex flex-col gap-10'>
         <h5 className='text-2xl'>John Kyle Salaysay</h5>

         <div className='flex flex-row gap-2'>
          <p className='bg-gray-200 w-full p-2'>Address : Poblacion, Oslob, Cebu</p>
          <p className='bg-gray-200 w-full p-2'>Age: 22</p>
          <p className='bg-gray-200 w-full p-2'>Gender: Male</p>
         </div>
       </div>
    </div>
  )
}
