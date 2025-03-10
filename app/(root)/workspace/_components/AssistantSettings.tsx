"use client"
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Save, Trash } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import ConfirmationAlert from './ConfirmationAlert'
import { BlurFade } from '@/components/magicui/blur-fade'

const AssistantSettings = () => {
  const updateAssistant = useMutation(api.userAiAssistants.updateUserAiAssistant)
  const deleteAssistant = useMutation(api.userAiAssistants.deleteAssistant)
  const [loading,setLoading] = useState(false)
  const onHandleInputChange = (field:string,value:String) =>{
    setAssistant((prev:any) => ({
      ...prev,
      [field]:value
    }))
  }

  const onSave=async ()=>{
    setLoading(true)
    const result = await updateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction,
    }) 
    toast("Saved!")
    setLoading(false)
  }

  const onDelete =async ()=>{
    setLoading(true)
    await deleteAssistant({
      id:assistant?._id
    })
    setAssistant(null)
    setLoading(false)
  }

  const {assistant,setAssistant} = useContext(AssistantContext)
  return assistant &&(
    <div className='p-5 bg-secondary dark:bg-black border-l-[1px] h-screen'>
      <h2 className='font-semibold text-base'>Settings</h2>
       <BlurFade delay={0.25 } inView>
      <div className='mt-4 flex gap-3'>
        <Image src={assistant?.image} alt="assistant" width={80} height={80} 
        className='rounded-xl h-[80px] w-[80px]'/>
      <div>
      <h2 className='font-bold'>{assistant.name}</h2>
      <p className='text-gray-700 dark:text-gray-500'>{assistant.title}</p>
      </div>
    </div>
      </BlurFade>
      <BlurFade delay={0.25 *2} inView>
    <div className='mt-4'><h2 className='text-gray-500'>Model:</h2>
      <Select defaultValue={assistant.aiModelId} onValueChange={(value)=>onHandleInputChange("aiModelId",value)}>
      <SelectTrigger className="w-full bg-white">
         <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {AiModelOptions.map((model,index)=>(
        <SelectItem value={model.name} key={model.name}>
          <div  key={index} className='flex gap-2 items-center m-1 dark:text-black '>
            <Image src={model.logo} alt={model.name} width={20} height={20}
            className='rounded-md'/>
            <h2>{model.name}</h2>
          </div>
          </SelectItem>
          ))}
      </SelectContent>
      </Select>
    </div>
      </BlurFade>
      <BlurFade delay={0.25 *4} inView>
    <div>
      <h2 className='text-gray-500 mt-4'>Instructions:</h2>
      <Textarea placeholder='Add Instruction' value={assistant?.userInstruction} className='h-[150px] bg-white dark:text-black' onChange={(e)=>{onHandleInputChange("userInstruction",e.target.value)}}/>
    </div>
    </BlurFade>
    <div className='absolute bottom-10  justify-end gap-5 right-5 flex'>
      <ConfirmationAlert onDelete={onDelete}>
      <Button className='bg-red-500 cursor-pointer' variant="ghost" disabled={loading}><Trash/>Delete</Button>
      </ConfirmationAlert>
      <Button className='bg-green-500 cursor-pointer' onClick={onSave} disabled={loading}>{loading ? <Loader className='animate-spin'/>:<Save/>}Save</Button>
    </div>
    </div>
  )
}

export default AssistantSettings