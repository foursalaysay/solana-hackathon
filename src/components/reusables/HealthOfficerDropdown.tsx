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

  
const HealthOfficerDropdown = () => {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0">
            <DropdownMenuLabel>Health Officer</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href='healthofficer/donation'>Donations</Link></DropdownMenuItem>
            {/* <DropdownMenuItem><Link href='healthofficer/donation'>History</Link></DropdownMenuItem> */}
            <DropdownMenuItem><Link href='/'>Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  </div>
  )
}

export default HealthOfficerDropdown