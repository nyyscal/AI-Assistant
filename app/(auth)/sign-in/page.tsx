"use client"
import { Button } from '@/components/ui/button'
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image'
import React from 'react'

const SignIn = () => {
  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);

    if(typeof window !== undefined){
    localStorage.setItem("user_token",tokenResponse.access_token);
    }

    const user = GetAuthUserData(tokenResponse.access_token)

    console.log(user);
  },
  onError: errorResponse => console.log(errorResponse),
});
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
    <div className='flex items-center flex-col justify-center gap-8 border rounded-2xl p-10 shadown-md'>
      <Image src="/logo.svg" alt="logo" width={150} height={150}/>
      <h2 className='text-2xl font-sans'>Sign in to AI Assistant</h2>
      <Button className='font-sans cursor-pointer' onClick={()=>googleLogin()}>Sign in with Gmail</Button>
    </div>
    </div> 
  )
}

export default SignIn