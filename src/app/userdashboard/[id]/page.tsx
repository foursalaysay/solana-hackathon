'use client'


import React from 'react'
import { useRouter } from 'next/navigation'
import { usePublicKey } from '@/components/context/PublicKeyContext'

export default function UserMainPage() {

    const publicKey = usePublicKey();

  return (
    <div>
        <h1>Hellow</h1>
        <h2>yeah</h2>
        <h3>{publicKey}</h3>
    </div>
  )
}
