import React, { act, useEffect, useState } from 'react';
import { UserIcon } from 'lucide-react';
import { DotIcon } from 'lucide-react';
import { useMessaging } from '../Providers/MessagingContext';

type messageType = {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isSelected:Boolean;
}

const Message = ({ isSelected,id, user, timestamp }: messageType) => {
  const {currentMessaging}=useMessaging();
  const [active, setActive]=useState(false);
  const message="Start the conversation. get Started "

  useEffect(()=>{

    if(id===currentMessaging.userId){
      setActive(true);
     

    }
    console.log("active",currentMessaging );

  },[currentMessaging])

  

  return (
    <div className={`flex gap-1  w-full cursor-pointer border-b-2 items-center p-2 ${isSelected? "bg-slate-100":"bg-white"}`}>
      <UserIcon />
      <div className='flex flex-col'>
        <div className='flex w-full'>
        <span className='font-bold text-gray-500'>{user}</span>
          <DotIcon/>
          
        </div>
        <span className='text-md'>{user}: {message.slice(0,30)+"..."}</span>
      </div>
    </div>
  );
}

export default Message;
