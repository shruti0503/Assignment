import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox/ChatBox';
import TopBar from '../components/TopBar';
import { useUser } from '../Providers/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMessaging } from '../Providers/MessagingContext';
import { socket } from '../App';

const MainPage = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const { currentMessaging } = useMessaging();
  const[checkStatus,setCheckStatus]=useState(false);

  useEffect(() => {
    if (location.pathname === '/chat' && !user.id) {
      navigate('/sign-up');
    }
  }, [location, user.id, navigate]);

  useEffect(() => {
    if (user.id) {
      socket.emit('goOnline', user.id);
    }
    
    return () => {
      socket.off('onlineStatusChanged');
    };
  }, [user.id]);

  return (
    <div className='flex w-[100vw] h-[100vh] flex-col '>
      <TopBar />
      <div className='h-full w-full flex p-10 pt-0 pb-1 flex-col overflow-hidden'>
        <div className=' flex w-full h-full px-20 md:px-3 sm:px-0'>
          <Sidebar messages={messages}  />
          <ChatBox  messages={messages}
           setMessages={setMessages} 
           checkStatus={checkStatus}
           setCheckStatus={checkStatus}
           conversationId={currentMessaging.conversationId}
            userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
