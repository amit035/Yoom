"use client"

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'

const EndCallButton = () => {
  
  const call = useCall();
  const router = useRouter();

  const {useLocalParticipant} = useCallStateHooks();
  const LocalParticipants=useLocalParticipant();

  const isMeetingOwner = LocalParticipants && call?.state.createdBy && 
  LocalParticipants.userId === call?.state.createdBy.id;

  if(!isMeetingOwner) return null;
  return (
    <button onClick={async()=>{
        call.endCall();
        router.push('/')
    }} className='bg-red-500 rounded-sm'>
        End Call for Everyone
    </button>
  )
}

export default EndCallButton