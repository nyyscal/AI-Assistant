"use client"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const Header = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className='p-3 flex items-center justify-between shadow-sm px-14'>
      <Image src="/logo.svg" alt="logo" width={40} height={40}/>
      {user?.picture && <Image src={user?.picture} alt="logo" width={40} height={40} className='rounded-full'/>}
    </div>
  )
}

export default Header