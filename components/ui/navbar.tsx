import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './mobilenav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-2 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image 
            src="/icons/Logo.png"
            width={45}
            height={45}
            alt="Video Conferencing App"
            className='max-sm:size-10'   
        />
        <p className='text-[26px] font-bold text-white max-sm:hidden'>YOOM</p>
      </Link>
      <div className='flex-between gap-5'>
          {/** Clerk User Management*/}
          <SignedIn>
              <UserButton />
            </SignedIn>
          <MobileNav/>
      </div>

    </nav>
  )
}

export default Navbar