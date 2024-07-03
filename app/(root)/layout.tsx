
import StreamVideoProvider from '@/Providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Video Conference App",
  icons:"/icons/Logo.png",
  description: "Generated by create next app",
};

const RootLayout = ({children} : {children : ReactNode}) => {
  return (
    <main>
        <StreamVideoProvider>
           {children}
        </StreamVideoProvider>
    </main>
  )
}

export default RootLayout