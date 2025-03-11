import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'


const Profile = ({openDialog,setOpenDialog}:any) => {
  const {user} = useContext(AuthContext)
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='font-sans'>User Information</DialogTitle>
      <DialogDescription asChild>
        <div>
          <div className='flex gap-4 items-center'>
            <Image src={user?.picture} alt="user" width={60} height={60} className='w-[60px] h-[60px] object-contain rounded-full mt-2'/>
            <div>
              <h2 className='font-bold text-lg'>{user?.name}</h2>
              <h2 className='text-gray-500'>{user?.email}</h2>
            </div>
          </div>
          <hr className='my-3'/>
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold font-sans'>Token Usage</h2>
            <h2>0/0</h2>
            <Progress value={28} />
            <h2 className='font-sans mt-2 font-bold flex justify-between'>Current Plan :<span className='p-1 bg-gray-100 dark:bg-purple-800 dark:text-white rounded-md'>{!user?.orderId ?"Free Plan" :"Pro Plan"}</span></h2>
          </div>
            <div className='p-4 border rounded-xl mt-4'>
          <div className='flex justify-between items-center' >
              <div>
            <h2 className='font-bold text-lg text-amber-400'>Pro Plan</h2>
            <h2>100,000 tokens</h2>
              </div>
              <h2 className='text-amber-400'>$10/month</h2>
            </div>
            <hr className='my-3'/>
            <Button className='cursor-pointer w-full'> <Wallet/> Upgrade - 10$</Button>
          </div>
         
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default Profile