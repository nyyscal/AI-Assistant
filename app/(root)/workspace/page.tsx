import React from 'react'
import AssistantList from './_components/AssistantList'

const WorkSpace = () => {
  return (
    <div className='h-screen fixed w-full'>
      <div className='grid grid-cols-5'>
          <div className='hidden md:block'>
            {/* assistant list */}
            <AssistantList/>
          </div>
          <div className=' md:col-span-4 lg:col-span-3'>
            CHAT UI
          </div>
          <div className='hidden lg:block'>
          SETTINGS
          </div>
        </div>
    </div>
  )
}

export default WorkSpace