"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_compnents/Header';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { AssistantContext } from '@/context/AssistantContext';
//Client Side
const Provider = ({children,}:Readonly<{children: React.ReactNode;}>) => {
  const router = useRouter()
  const {user,setUser} = useContext(AuthContext)
  const convex = useConvex()
  const [assistant,setAssistant] = useState()
  useEffect(()=>{
    checkUserAuth()
  },[])

  const checkUserAuth = async()=>{
    const token = localStorage.getItem("user_token")
    //Get New Access Token
    const user = token && await GetAuthUserData(token)
    if(!user?.email){
      router.push("/sign-in")
      return
    }
    //Get User Info from Convex
    try {
      const result = await convex.query(api.users.getUser,{
        email: user?.email
      })
      console.log(result)
      setUser(result)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <AssistantContext.Provider value={{assistant,setAssistant}}>
      <Header/>
      {children}
      </AssistantContext.Provider>
      </div>
  )
}

export default Provider