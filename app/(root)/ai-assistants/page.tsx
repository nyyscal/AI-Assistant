"use client"
import { BlurFade } from '@/components/magicui/blur-fade'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthContext } from '@/context/AuthContext'
import { api } from '@/convex/_generated/api'
import AiAssistantsList from '@/services/AiAssistantsList'
import { useConvex, useMutation } from 'convex/react'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export type Assistant={
  id:number,
  name:string,
  title:string,
  image:string,
  instruction:string,
  userInstruction:string,
  sampleQuestions: string[]
}

const AIAssistant = () => {
  const [selected, setSelected] = useState<Assistant[]>([])
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const convex = useConvex()
  const router = useRouter()
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants)


  const onSelect = (assistant:Assistant) =>{
    const item = selected.find((item:Assistant) => item.id === assistant.id)
    if(item){
      setSelected(selected.filter((item:Assistant)=>item.id!==assistant.id))
      return
    }
    setSelected(prev => [...prev,assistant])
  }

  const isSelected = (assistant: any)=>{
    const item = selected.find((item:Assistant )=> item.id === assistant.id)
    return item?true:false
  }

  const onClickContinue = async()=>{
    setLoading(true)
      const result = await insertAssistant({
        records: selected,
        uid: user?._id
      })
      setLoading(false)
      console.log(result)
  }

  useEffect(()=>{
    user && getUserAssistance()
  },[user])
  
  const getUserAssistance = async()=>{
    const result = await convex.query(api.userAiAssistants.getAllUserAssistants,{
      uid: user._id
    })
    console.log(result)
    if(result.length > 0){
      router.replace("/workspace")
      return
    }
  }

  return (
    <div className='px-10 mt-18 md:px-28 lg:px-36 xl:px-48'>
      <BlurFade delay={0.05 + 0.01 +0.01} inView>
      <div className="flex justify-between items-center font-sans">
      <div >
        <h2 className='text-3xl font-bold'>Welcome to the World of AI Assistants!🤖</h2>
        <p className='text-xl mt-2'>Choose your AI Companion according to the task 🚀</p>
      </div>
        <RainbowButton onClick={onClickContinue} disabled={selected?.length==0 || loading} className='cursor-pointer dark:bg-white md:text-md text-sm'>{loading && <Loader className='animate-spin'/>}Get Started</RainbowButton>
      </div>
        </BlurFade>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {AiAssistantsList.map((assistant,index)=>(
          <BlurFade key={assistant.image} delay={0.25 } inView>
          <div key={index} className='hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative' onClick={()=>onSelect(assistant)}>
            <Checkbox className='absolute m-2' checked={isSelected(assistant)}/>
            <Image src={assistant.image} alt={assistant.title} width={600} height={600} className='rounded-xl w-full h-[200px] object-cover'/>
            <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
            <h2 className='text-center text-gray-600 dark:text-gray-300 font-bold text-sm'>{assistant.title}</h2>
          </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default AIAssistant