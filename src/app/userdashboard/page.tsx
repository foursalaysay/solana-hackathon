'use client'

import { usePublicKey } from '@/components/context/PublicKeyContext'
import Navbar from '@/components/reusables/Navbar';
import { Separator } from '@/components/ui/separator';
import React from 'react'


const UserDashboard = () => {

  return (
    <div>
      <Navbar />
      <Separator />
    </div>
  )
}

export default UserDashboard