'use client'

import { usePublicKey } from '@/components/context/PublicKeyContext'
import Navbar from '@/components/reusables/Navbar';
import { UserForm } from '@/components/reusables/UserForm';
import { Separator } from '@/components/ui/separator';
import React from 'react'


const UserDashboard = () => {

  return (
    <div>
      <Navbar />
      <Separator />
      <UserForm />
    </div>
  )
}

export default UserDashboard