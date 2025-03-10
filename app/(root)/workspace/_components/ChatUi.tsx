"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader, Loader2, Send } from 'lucide-react'
import AiModelOptions from '@/services/AiModelOptions'
import { AssistantContext } from '@/context/AssistantContext'
import axios from 'axios'
import Image from 'next/image'

type MESSAGE ={
  role:string,
  content:string
}
const ChatUi = () => {
  const [input, setInput ] = useState<string>("")
  const {assistant,setAssistant} = useContext(AssistantContext)
  const [messages,setMessages] = useState<MESSAGE[]>([])
  const [loading,setLoading] = useState(false)
  const chatRef = useRef<any>(null)

  useEffect(()=>{
    if(chatRef.current){
      chatRef.current.scrollTop=chatRef.current.scrollHeight
    }
  },[messages])

  useEffect(()=>{
    setMessages([])
  },[assistant?._id])

  const onSendMessage =async ()=>{
    setLoading(true)
    setMessages(prev=>[...prev,
      {
      role:"user",
      content:input
    },{
      role:"assistant",
      content:"Loading..."
    }
  ])
  const userInput = input;
  setInput("");
    const AIModel = AiModelOptions.find(item=>item.name==assistant.aiModelId)

    const result = await axios.post("/api/eden-ai-model",{
      provider:AIModel?.edenAi,
      userInput:userInput+":"+assistant?.instruction+":"+assistant?.userInstruction,
      aiResp: messages[messages?.length-1]?.content
    })
    setLoading(false)
    // console.log(result.data)
    setMessages(prev=>prev.slice(0,-1))
    setMessages(prev=>[...prev,result.data])

  }
  return (
    <div className='mt-20 p-6 relative h-[88vh]'>
      {messages?.length==0 &&<EmptyChatState/>}
      <div className='h-[74vh] overflow-scroll scrollbar-hide' ref={chatRef}>
        {messages.map((msg,index)=>(
          <div key={index} className={`flex mb-4 ${msg.role=="user"?"justify-end":"justify-start"}`}>
            <div className='flex gap-3'>
              {msg.role=="assistant" ?<Image src={assistant.image} alt="assistant" width={100} height={100} className='w-[30px] h-[30px] rounded-full object-cover'/>:null}
              <div className={`p-3 flex items-center gap-2 rounded-lg ${msg.role=="user"?"bg-gray-200 text-black rounded-lg":"bg-gray-600 text-black rounded-lg"}`}>
                {loading&& messages?.length-1==index && <Loader2 className='animate-spin'/>}
                <h2>{msg.content}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
     <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[92%]'>
      <Input placeholder='Start Typing here...' onChange={(e)=>setInput(e.target.value)} onKeyPress={(e)=>
        e.key=="Enter" && onSendMessage()} value={input} disabled={loading}/>
      <Button disabled={loading} className='dark:bg-gray-800'><Send className='dark:bg-gray-800 text-white'/></Button>
     </div>
    </div>
  )
}

export default ChatUi