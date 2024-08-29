'use client'

import { UserForm } from '@/components/reusables/UserForm';
import { Separator } from '@/components/ui/separator';
import React from 'react'

const UserDashboard = () => {

  return (
    <div className='flex flex-col'>
      <Separator />
      <div className='flex flex-col gap-5 w-11/12 lg:w-4/6 h-full border-2 border-red-600 rounded-md p-10 my-5 place-self-center'>
        <h2 className='text-xl lg:text-3xl font-bold'>Complete your Profile</h2>
        <Separator />
        <UserForm />
      </div>
    </div>
  )
}

export default UserDashboard