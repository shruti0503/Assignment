import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import InputMessage from './InputMessage';
import MessageSent from './MessageSent';
import { useMessaging } from '../../Providers/MessagingContext';

const socket = io('http://localhost:8080');

const ChatBox = ({ conversationId, userId, messages, setMessages ,checkStatus,setCheckStatus}: any) => {
  const [newMessage, setNewMessage] = useState('');
  const [onlineStatus, setOnlineStatus] = useState(false);
  const { currentMessaging } = useMessaging();
  const [changedId, setChangedId]=useState(null);
  const [online,setOnline]=useState(false);
  
  // Reference for the message list to scroll to the bottom
  const messageEndRef = useRef<HTMLDivElement>(null);

  const check=()=>{

    if (changedId === currentMessaging.userId) {
        setOnlineStatus(online);
      }
      console.log("online", online)

  }

  useEffect(()=>{
    check()

  },[checkStatus])

  useEffect(() => {
    socket.emit('joinConversation', conversationId);

    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on('newMessage', (message) => {
      //@ts-ignore
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Set initial online status on component mount
    socket.emit('goOnline', userId);


    socket.on('onlineStatusChanged', ({ userId: changedUserId, online }) => {
      console.log("changedUserId",changedUserId)
      // setCheckStatus(!checkStatus);
      // setChangedId(changedUserId)
      // setOnline(online)


      if (changedUserId === currentMessaging.userId) {
        setOnlineStatus(online);
      }
    });

    return () => {
      socket.off('newMessage');
      socket.off('loadMessages');
      socket.off('onlineStatusChanged');
    };
  }, [conversationId, userId, currentMessaging.userId]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTo({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', {
        conversationId,
        senderId: userId,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='ChatBox flex h-full w-[70%] border-l-2 flex-col justify-between'>
      <div className='topBar bg-[#f6f6f6] p-3 flex w-full justify-between'>
        <p className='font-bold text-lg'>{currentMessaging.username}</p>
        <span className={onlineStatus ? 'text-green-500' : 'text-gray-500'}>
          {onlineStatus ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className='flex-grow justify-end bg-white flex flex-col p-4 space-y-4 overflow-y-auto'>
        {messages.map((msg: any, index:any) => (
          <MessageSent 
            key={index} 
            message={msg.content} 
            sentBy={msg.sender_id === userId ? 'You' : currentMessaging.username} 
            isSentByCurrentUser={msg.sender_id === userId} 
          />
        ))}
      </div>

      <InputMessage 
        sendMessage={sendMessage} 
        newMessage={newMessage} 
        setNewMessage={setNewMessage} 
        onKeyDown={handleKeyDown}  
      />
    </div>
  );
}

export default ChatBox;
