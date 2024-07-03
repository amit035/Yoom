import {SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const SignIN = () => {
  return (
    <main className='flex h-screen w-full justify-center items-center'>
        <SignIn/>
    </main>
  )
}

export default SignIN