'use client'
import { useGetCallById } from "@/Hooks/useGetCallById";
import MeetingRoom from "@/components/ui/MeetingRoom";
import MeetingSetUp from "@/components/ui/MeetingSetUp";
import Loader from "@/components/ui/loader";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";


const Meetings =({ params : {Id} }: { params: {Id: string } }) => { 
    const {user,isLoaded} = useUser();
    const [isSetUpComplete, setIsSetUpComplete] = useState(false)

    const {call,isCallLoading} = useGetCallById(Id);

    if(!isLoaded || isCallLoading) return <Loader/>

    return (
      <main className="h-screen w-full"> 
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetUpComplete ? (<MeetingSetUp setIsSetUpComplete={setIsSetUpComplete}/>) : (<MeetingRoom/>)
                }
            </StreamTheme>
        </StreamCall>
      </main>
    )
  }
  
  export default Meetings