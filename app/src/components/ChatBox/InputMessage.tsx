import React from 'react';
import { Paperclip, SendIcon } from 'lucide-react'

const InputMessage = ({ sendMessage, newMessage, setNewMessage }:any) => {
  return (
    <div className='flex items-center gap-2 p-3 bg-gray-100'>
      <input
        type='text'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder='Type your message...'
        className='w-full p-2 border rounded'
      />
      <div className=' messageIcon cursor-pointer flex gap-2 items-center'>
      <Paperclip />
      <div onClick={sendMessage} className='cursor-pointer bg-rgb(254 231 226) flex items-center p-2 rounded-lg' style={{backgroundColor:"rgb(254 231 226)"}}>
        <SendIcon  />
      </div>
      
    </div>
      
    </div>

  );
};

export default InputMessage;
