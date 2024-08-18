// components/Sidebar.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Messages } from '../constants';
import Message from './Message';
import { useUser } from '../Providers/UserContext';
import { useMessaging } from '../Providers/MessagingContext';
import { socket } from '../App';


const Sidebar = ({messages}:any) => {

  const { status, setStatus, currentMessaging, selectUser } = useMessaging();

  const {user,allUsers}=useUser();
  const [ConversationUsers,setConversationUsers]=useState([]);

  const messageStatus = ["All", "Unread", "Archived", "Blocked"];

  const getConversation=async()=>{
    try{
      const resp=await axios.get(`http://localhost:8080/user-conversations/${user.id}`)
      console.log(resp.data)
      setConversationUsers(resp.data)
    }
    catch(err){
      console.log(err);
    }
    
  }

  const UserSelection=()=>{
    socket.emit('joinConversation', currentMessaging.conversationId)
    
  }

  useEffect(()=>{
    UserSelection();

  },[currentMessaging])

  console.log("messages", messages)

  const getConversationDetails=()=>{

  }

  useEffect(()=>{

  },[selectUser])

  useEffect(()=>{
    getConversation();
   

   

  },[])
  console.log("messages",messages)

  

  return (
    <div className='h-full w-[30%]'>
      <Search />
      <div className='h-full w-full p-2'>
        <div className='flex gap-2 mb-4'>
          {messageStatus.map((statusOption) => (
            <div
              key={statusOption}
              className={`border-2 rounded-2xl px-3 py-1 cursor-pointer ${
                status === statusOption ? ' text-white' : 'bg-gray-200'
              }`}
              style={{backgroundColor: status === statusOption ? "rgb(239 97 68)":"" }}
              //@ts-ignore
              onClick={() => setStatus(statusOption )}
            >
              {statusOption}
            </div>
          ))}
        </div>

        <div className='flex flex-col mt-4  w-full h-full overflow-y-auto p-2 pt-1'>
          {ConversationUsers.filter(() => {
            // Implement your filtering logic based on the status here
            return true;
          }).map((message:any) => (
            <div 
            className={`flex cursor-pointer w-full ${currentMessaging.userId === message.id? "bg-slate-100":"bg-white"}`}
            onClick={() => {
              console.log("clicked")
              UserSelection();
                selectUser(message.participantId, message.username, message.conversationId)

            }}
            >
              {
                message.participantId !==user.id 
                &&
                <Message
               // key={message.id}
                id={message.participantId}
                user={message.username}
                 //message={messages[Messages.length-1].content}
                //timestamp={message?.timestamp}
                isSelected={currentMessaging.userId === message.participantId}
              />

              }
            
              </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
