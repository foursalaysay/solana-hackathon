'use client'

import { usePublicKey } from '@/components/context/PublicKeyContext'
import { UserForm } from '@/components/reusables/UserForm';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const UserDashboard = () => {

  const publicKey = usePublicKey();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/userdashboard/${publicKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch participant data');
        }

        const data = await response.json();

        if (response) {
          router.push(`/userdashboard/${publicKey}`);
        }

        console.log('Participant Data:', data.participant);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUser();
  }, [publicKey, router]);



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