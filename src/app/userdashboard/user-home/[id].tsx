import React from 'react'
import { useRouter } from 'next/router'

export default function UserMainPage() {

    const router = useRouter();
    const { id } = router.query;

  return (
    <div>
        <h1>Hellow</h1>
        <h1>{id}</h1>
    </div>
  )
}
