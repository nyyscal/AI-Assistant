import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Assistant } from '../../ai-assistants/page'
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import AssistantAvatar from './AssistantAvatar'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { AssistantContext } from '@/context/AssistantContext'
import { Loader2 } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'
const DEFAULT_ASSISTANT={
  image:"/bug-fixer.avif",
  name:"",
  title:"",
  instruction:"",
  id:0,
  sampleQuestions:[],
  userInstruction:"",
  aiModelId:"",

}


const AddNewAssistant = ({children}:any) => {
  const[selectedAssistant,setSelectedAssistant] = useState<Assistant>(DEFAULT_ASSISTANT)
  const addAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants)
  const {user} = useContext(AuthContext)
  const {assistant,setAssistant} = useContext(AssistantContext)
  const [loading,setLoading] = useState(false)
  const onSave = async()=>{
    if(!selectedAssistant?.name || !selectedAssistant?.title || !selectedAssistant?.userInstruction){
      toast("Please enter all details!")
      return;
    }
    setLoading(true)
    const res = await addAssistant({
      records:[selectedAssistant],
      uid: user?._id,
    })
    toast("New Assistant Added!")
    setAssistant(null)
    setLoading(false)


  }
  const onHandleInputChange= (field:string,value:string)=>{
    setSelectedAssistant((prev:any)=>(
      {
        ...prev,
        [field]:value
      }
    ))
  }

  return (
  <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='font-sans'>Add New Assistant</DialogTitle>
      <DialogDescription asChild>
        <div className='grid grid-cols-3 gap-5 mt-2'>
          <div >
            <h2><Button variant={'secondary'} size={"sm"} 
            onClick={()=>setSelectedAssistant(DEFAULT_ASSISTANT)}
            className='w-full cursor-pointer mb-2 font-sans'> + Create New Assistant</Button>
            </h2>
            <div className='mt-2 border-r p-3'>
              {AiAssistantsList.map((assistant,index)=>(
              <div key={index} onClick={()=>setSelectedAssistant(assistant)} 
              className='p-2 hover:bg-gray-800 flex gap-2 items-center rounded-xl cursor-pointer'>
                <Image src={assistant.image} width={80} height={60} alt={assistant.name} className='w-[50px] h-[40px] object-cover rounded-lg'/>
                <h2 className='text-sm'>
                  {assistant.title}
                </h2>
              </div>
            ))}
            </div>
          </div>
          <div className='col-span-2 font-sans'>
            <div className='flex gap-5 items-center'>
              <div>
                {selectedAssistant && 
                <AssistantAvatar selectedImage={(v:string)=>onHandleInputChange("image",v)}>
                <Image src={selectedAssistant?.image} alt="bug" width={150} height={150} className='w-[100px] h-[100px] rounded-xl object-cover cursor-pointer'/>
                </AssistantAvatar>
                }
              </div>
              <div className='flex flex-col gap-3  w-full '>
                <Input placeholder='Name of Assistant' className='w-full'
                value={selectedAssistant?.name}
                 onChange={(e)=>onHandleInputChange("name",e.target.value)}/>
                <Input placeholder='Title of Assistant' className='w-full mt-2'
                 onChange={(e)=>onHandleInputChange("title",e.target.value)}
                value={selectedAssistant?.title}/>
              </div>
               
            </div>
            <div className='mt-4'><h2 className='text-gray-500 mb-2'>Model:</h2>
                    <Select defaultValue={selectedAssistant.aiModelId} onValueChange={(value)=>onHandleInputChange("aiModelId",value)} >
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
                  <div className='mt-4'>
                    <h2 className='text-gray-500 mb-2'>Instruction:</h2>
                    <Textarea placeholder='Add Instructions' value={selectedAssistant?.userInstruction} onChange={(e)=>onHandleInputChange("userInstruction",e.target.value)} className='h-[200px]'/>
                  </div>
                  <div className='flex gap-5 justify-end mt-10'>
                    <DialogClose>
                    <Button variant={'secondary'} className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button disabled={loading} onClick={onSave} className='cursor-pointer'>{loading && <Loader2 className='animate-spin'/>}Add</Button>
                  </div>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default AddNewAssistant