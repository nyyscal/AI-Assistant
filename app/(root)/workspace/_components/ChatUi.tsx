"use client"
import React, { useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const ChatUi = () => {
  const [input, setInput ] = useState<string>()
  const onSendMessage =()=>{}
  return (
    <div className='mt-20 p-6 relative h-[88vh]'>
      <EmptyChatState/>
     <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[92%]'>
      <Input placeholder='Start Typing here...' onChange={(e)=>setInput(e.target.value)} onKeyPress={(e)=>
        e.key=="Enter" && onSendMessage()}/>
      <Button className='dark:bg-gray-800'><Send className='dark:bg-gray-800 text-white'/></Button>
     </div>
    </div>
  )
}

export default ChatUi