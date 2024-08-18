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
  const {currentMessaging}=useMessaging();
  const [onlineStatus,setOnlineStatus]=useState(true);

  useEffect(() => {
    if (location.pathname === '/chat') {
      if (!user.id) {
        navigate('/sign-up');
      }
    }
  }, [location, user.id, navigate]);

  useEffect(()=>{

    socket.emit('goOnline',user.id)
    
    return()=>{
      socket.off('onlineStatusChanged');
    }

  },[])

  return (
    <div className='flex w-[100vw] h-[100vh] flex-col'>
      <TopBar />
      <div className='h-full w-full flex p-10 pt-0 flex-col' style={{height:"calc(100% - 50px)"}}>
        <div className='flex w-full h-full px-20'>
          <Sidebar />
          <ChatBox conversationId={currentMessaging.conversationId} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
