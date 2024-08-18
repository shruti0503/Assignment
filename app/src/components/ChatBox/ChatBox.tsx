import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import InputMessage from './InputMessage';
import MessageSent from './MessageSent';
import { useMessaging } from '../../Providers/MessagingContext';

const socket = io('http://localhost:8080');

const ChatBox = ({ conversationId, userId }: any) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineStatus,setOnlineStatus]=useState(false);
  const { currentMessaging } = useMessaging();

  useEffect(() => {
    // Join the conversation room
    socket.emit('joinConversation', conversationId);

    // Fetch existing messages when joining the room
    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

  

    // Cleanup on component unmount
    return () => {
      socket.off('newMessage');
      socket.off('loadMessages');
    };

  }, [conversationId]);

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

  return (
    <div className='ChatBox flex h-full w-[70%] border-l-2 flex-col justify-between'>
      <div className='topBar bg-[#f6f6f6] p-3 flex w-full'>
        <p className='font-bold text-lg'>{currentMessaging.username}</p>
      </div>

      <div className='bg-white flex flex-col h-full p-4 space-y-4 overflow-y-auto'>
        {messages.map((msg, index) => (
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
      />
    </div>
  );
}

export default ChatBox;
