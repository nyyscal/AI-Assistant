import React from 'react'
import Provider from './provider';

//Server Side
const WorkSpaceLayout = ({children,}:Readonly<{children: React.ReactNode;}>) => {
  return (
    <Provider>
      <div>{children}</div>
    </Provider>
  )
}

export default WorkSpaceLayout