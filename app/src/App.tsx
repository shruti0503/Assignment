
import MainPage from './main/MainPage'
import './App.scss'
import Login from './main/Login'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import {  useEffect } from 'react'
import SignUp from './main/SignUp'
import {io} from "socket.io-client"
import { useUser } from './Providers/UserContext'
export  const socket=io("http://localhost:8080");

function App() {

 

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log("connected", socket.id)
    })
   

  },[])


 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path="/chat" element={<div className='w-full flex'> <MainPage /></div>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
