import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Layout, Users } from 'lucide-react'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './loader'


type CallLayoutType='Grid' | 'Speaker-Left' | 'Speaker-Right'

const MeetingRoom = () => {

  const SearchParams = useSearchParams(); 
  const isPersonalRoom = !!SearchParams.get('Personal')

  const [layout, setLayout] = useState<CallLayoutType>('Speaker-Left')

  const [showParticipants, setShowParticipants] = useState(false)

  const {useCallCallingState} = useCallStateHooks();

  const callingState = useCallCallingState();

  const router = useRouter();

  if(callingState!==CallingState.JOINED) return <Loader/>

  const CallLayout =()=>{
      switch (layout) {
        case 'Grid':
           return <PaginatedGridLayout/>
        case 'Speaker-Right':
          return <SpeakerLayout participantsBarPosition="left"/>
        default:
          return <SpeakerLayout participantsBarPosition="right"/>
      
      }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden pt-4 text-white '>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <CallLayout/>
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
                <CallParticipantsList onClose={()=> setShowParticipants(false)}/>
            </div>
        </div>
        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
          <CallControls onLeave={()=>{
              router.push('/')
          }}/>
          <DropdownMenu>
            <div>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#1923d] px-4 py-2 hover:bg-[#4c535b]'
              >
                <Layout size={20} className='text-white'/>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
              {['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>(
                <div key={index}>
                    <DropdownMenuItem className='cursor-pointer' onClick={()=>{
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }}>
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className='bg-dark-1'/>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton/>
          <button onClick={()=>setShowParticipants((prev)=>!prev)}>
              <div className='cursor-pointer rounded-2xl bg-[#1923d] px-4 py-2 hover:bg-[#4c535b]'>
                  <Users size={20} className='text-white'/>
              </div>
          </button>
              {!isPersonalRoom && <EndCallButton/>}
        </div>
    </div>
  )
}

export default MeetingRoom