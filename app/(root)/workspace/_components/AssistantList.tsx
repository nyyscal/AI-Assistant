"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Assistant } from '../../ai-assistants/page'
import Image from 'next/image'
import { AssistantContext } from '@/context/AssistantContext'
import { BlurFade } from '@/components/magicui/blur-fade'
import AddNewAssistant from './AddNewAssistant'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, LogOutIcon, User2 } from 'lucide-react'
import Profile from './Profile'


const AssistantList = () => {
  const {user} = useContext(AuthContext)
  const convex = useConvex()
  const router = useRouter()
  const {assistant,setAssistant}= useContext(AssistantContext)
  const [openProfile,setProfileOpen] = useState(false)
  const [assistantList, setAssistantList] = useState<Assistant[]>([])
    useEffect(()=>{
      user && getUserAssistance()
    },[user && assistant==null])
    
    const getUserAssistance = async()=>{
      const result = await convex.query(api.userAiAssistants.getAllUserAssistants,{
        uid: user._id
      })
      console.log(result)
      setAssistantList(result)
    }
  
  return (
    <div className='p-5 bg-secondary border-2-[1px] dark:bg-transparent h-screen relative'>
      <h2 className='font-bold font-sans text-lg'>Your personal AI Assistant</h2>
      <AddNewAssistant>
      <Button className='w-full font-sans mt-3 cursor-pointer'>+ Add New Assistant</Button>
      </AddNewAssistant>
      <Input className='bg-white mt-3 font-sans' placeholder='Search...'/>
      <div className='mt-2'>
        {assistantList.map((assistant_,index)=>(
          <BlurFade key={index} delay={0.25 } inView>
          <div key={index} onClick={()=>setAssistant(assistant_)} 
          className={`p-2 flex gap-3 items-center hover:bg-gray-300 dark:hover:bg-[#28282B] cursor-pointer rounded-xl ${assistant_.id == assistant?.id && "bg-gray-300 dark:bg-gray-900"}`} >
            <Image src={assistant_.image} alt={assistant_.name} width={60} height={60} className='rounded-xl w-[60] h-[60] object-cover'/>
            <div className=''>
              <h2 className='font-bold'>{assistant_.name}</h2>
              <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{assistant_.title}</h2>
              </div>
          </div>
        </BlurFade>
        ))}
      </div>
     
      <DropdownMenu >
  <DropdownMenuTrigger asChild>
     <div className='absolute flex item-center justify-start bottom-10 gap-2 dark:text-gray-300 w-[90%] p-2 hover:dark:bg-gray-800 rounded-xl cursor-pointer'>
        {user && <Image src={user?.picture} alt="user" width={45} height={35} className='rounded-full font-sans'/>}
        <div>
        <h2 className='text-gray-200 font-sans dark:text-amber-300 font-semibold'>Er. {user?.name}</h2>
        <h2 className='font-sans text-xs text-amber-300'>{user?.orderId?"Pro Plan" :"Free Plan"}</h2>
        </div>
      </div>
      </DropdownMenuTrigger>
  <DropdownMenuContent className='w-[200px]'>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>setProfileOpen(true)} className='cursor-pointer'><User2/> Profile</DropdownMenuItem>
    <DropdownMenuItem className='cursor-pointer'><LogOut/>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    <Profile openDialog={openProfile} setOpenDialog={setProfileOpen}/>
    </div>
  )
}

export default AssistantList