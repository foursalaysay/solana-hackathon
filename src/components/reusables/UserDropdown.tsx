import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePublicKey } from '../context/PublicKeyContext'

const UserDropdown = () => {

  const publicKey = usePublicKey();

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0">
            <DropdownMenuLabel>{`${publicKey?.substring(0,8)}...`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href='/userdashboard/status'>Donations</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href='/userdashboard/profile'>Profile</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href='/'>Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  </div>
  )
}

export default UserDropdown