'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast, useToast } from "@/components/ui/use-toast"
import { Textarea } from './textarea'
import DatePicker from "react-datepicker";
import meeting from '@/app/(root)/(meeting)/[Id]/page'
import { Input } from './input'


const MeetingTypeList = () => {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
  'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

  const {user}=useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime : new Date(),
    description : '',
    link:''

  })
 
  const [callDetails, setCallDetails] = useState<Call>()
  const createMeeting = async()=>{
    if(!client || !user) return;

    try {
      if(!values.dateTime){
        toast({
          title: "Please select a date and time"})
          return;
      }
      const id=crypto.randomUUID();
      const call=client.call('default',id);
      if(!call) throw new Error('Failed to create Call');

      const startsAt=values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data:{
            starts_at:startsAt,
            custom:{
              description
            }
        }
      })

      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }

      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Create Meeting",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
  }

  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard
        img='/icons/add-meeting.svg'
        className='bg-orange-1'
        title='New Meeting'
        description='Start Instant Meeting'
        handleClick={()=>setMeetingState('isInstantMeeting')}
        />

        <HomeCard
        img='/icons/schedule.svg'
        className='bg-sky-2'
        title='Schedule Meeting'
        description='Plan your  Meeting'
        handleClick={()=>setMeetingState('isScheduleMeeting')}
        />

        <HomeCard
        img='/icons/recordings.svg'
        className='bg-blue-1'
        title='View Recordings'
        description='Check Out your Recordings'
        handleClick={()=>router.push('/recordings')}
        />

        <HomeCard
        img='/icons/join-meeting.svg'
        className='bg-orange-2'
        title='Join Meeting'
        description='via Invitation Link'
        handleClick={()=>setMeetingState('isJoiningMeeting')}
        />

        {!callDetails ?(
          <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
            <div className='flex flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px] text-sky-2'>Add a Description</label>
               <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible-ring:offset-0'
               onChange={(e)=>{
                setValues({...values,description:e.target.value})
               }}/>
            </div>
            <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
            <DatePicker
                selected={values.dateTime}
                onChange={(date)=>setValues({...values,dateTime:date!})}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm aa'
                className='w-full rounded bg-dark-2 p-2 focus:outline-none'            
            />
            </div>
        </MeetingModal>  
        ):(
          <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={()=>{
          navigator.clipboard.writeText(meetingLink);
          toast({title:'Link Copied'})
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText='Copy Meeting Link'
        /> 
        )}

        <MeetingModal
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Start an Instant Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        />

        <MeetingModal
          isOpen={meetingState === 'isJoiningMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Type the Link Here"
          className="text-center"
          buttonText="Join Meeting"
          handleClick={()=>router.push(values.link)}
        >
          <Input placeholder='Meeting Link' className='border-none bg-dark-2 focus-visible:ring-0 
          focus-visible:ring-offset-0' onChange={(e)=>setValues({ ... values,link:e.target.value})}>
          
          </Input>
        </MeetingModal>
    </section>
  )
}

export default MeetingTypeList