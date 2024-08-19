import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

import { socket } from '../App';
import axios from 'axios';
// Define types for the states
type MessageStatus = 'All' | 'Unread' | 'Archived' | 'Blocked';

interface CurrentMessaging {
  userId: number | null;
  username: string;
  conversationId:Number | null,
}

interface MessagingContextType {
  status: MessageStatus;
  setStatus: (status: MessageStatus) => void;
  currentMessaging: CurrentMessaging;
  //setCurrentMessaging:(currentMessaging:CurrentMessaging)=>void;
  selectUser: (userId: number, username: string,conversationId:Number) => void;
  clearSelectedUser: () => void;
}

// Create context
const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<MessageStatus>('All');
  const [currentMessaging, setCurrentMessaging] = useState<CurrentMessaging>({ userId: null, username: '' ,conversationId:null});

  const selectUser = (userId: number, username: string,conversationId:Number) => {

    console.log("wbndjwh")
    setCurrentMessaging({ userId, username, conversationId });
  };

  const clearSelectedUser = () => {
    setCurrentMessaging({ userId: null, username: '',conversationId:null });
  };
  

  // useEffect(()=>{

  //   socket.on('joinConversation',(conversation)=>{
  //     socket.join()

  //   })

  // },[currentMessaging])

  return (
    <MessagingContext.Provider value={{ status, setStatus,
     currentMessaging, selectUser,
     clearSelectedUser }}>
      {children}
    </MessagingContext.Provider>
  );
};

// Custom hooks 
export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
