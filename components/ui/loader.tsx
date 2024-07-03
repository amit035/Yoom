import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center h-screen w-full'>
        <Image 
            src="/icons/loading-circle.svg"
            alt="Loading"
            width={90}
            height={90}
        />
    </div>
  )
}

export default Loader