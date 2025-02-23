"use client"

import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesColumn } from 'lucide-react'
import React from 'react'

function UserMenu() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label='Dashboard' labelIcon={<ChartNoAxesColumn size={15} />} href='/dashboard'/>
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserMenu