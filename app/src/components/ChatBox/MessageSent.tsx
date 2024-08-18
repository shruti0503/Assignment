import React from 'react';

type MessageSentProps = {
  message: string;
  sentBy: string;
  isSentByCurrentUser: boolean;
};

const MessageSent = ({ message, sentBy, isSentByCurrentUser }: MessageSentProps) => {
  return (
    <div 
      className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`p-3 rounded-lg max-w-xs ${
          isSentByCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
        }`}
        style={{ backgroundColor: isSentByCurrentUser ? "rgb(239 97 68)" : "rgb(239 239 239)" }}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageSent;
