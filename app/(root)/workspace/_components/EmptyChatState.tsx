import { BlurFade } from '@/components/magicui/blur-fade'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { AssistantContext } from '@/context/AssistantContext'
import { ChevronRight } from 'lucide-react'
import React, { useContext } from 'react'

const EmptyChatState = () => {
  const {assistant, setAssistant} = useContext(AssistantContext)
  return (
    <div className='flex flex-col items-center'>
      <SparklesText className='text-2xl capitalize text-center' text='How can I assist you?'/>
      <div className='mt-7'>
        {assistant?.sampleQuestions.map((suggestion:string,index:number)=>(
          <BlurFade key={index} delay={0.25*index}>
          <div key={index}>
            <h2 className='p-4 text-lg border mt-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between gap-7' >{suggestion} <ChevronRight/></h2>
          </div>
        </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default EmptyChatState