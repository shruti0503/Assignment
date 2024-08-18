import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import axios from 'axios'
import { useUser } from '../Providers/UserContext';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/bg.jpg" // this is the background image
import { socket } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //@ts-ignore
    const {id, login}=useUser();
    console.log("password", password)
   const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       
        if (password && username) {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            setToken(response.data.token);
            const data=response.data.updatedUser[0];
            console.log("resp", response.data.updatedUser[0]);
            login(data.id, data.username, "");
            //console.log("response.data", response.data);
            setMessage('Login successful');
            setTimeout(() => {
                socket.emit('goOnline', data.id);
                navigate('/chat'); 

            }, 2000);
        } else {
            setMessage("Please enter all the fields");
        }
    } catch (err:any) {
        // Check if err.response exists and handle the message accordingly
        if (err.response && err.response.data) {
            setMessage(err.response.data.message || 'An error occurred');
        } else {
            setMessage('An error occurred');
        }
    }
};



  return (
    <div 
      className='flex w-full h-[100vh] items-center justify-center' 
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className='flex h-[50%] flex-col w-[50%] justify-evenly items-center rounded-lg border-2 bg-white bg-opacity-75'>
            <div className='flex justify-center items-center'>
               <h1 className='text-5xl font-bold'>Chat.io</h1>
               <img src={Logo} alt="Chat.io Logo" />
            </div>
            <h1 className='text-2xl'>Login</h1>
            <label className='font-bold' >Username</label>
            <div className='gap-1 px-3 flex w-[50%] p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
              <input placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}  className='w-full flex bg-[#f6f6f6] outline-none' />
            </div>

            <label className='font-bold' >Password</label>
                <div className='gap-1 px-3 flex w-[50%] p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
                <input placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}  type='password' className='w-full flex bg-[#f6f6f6] outline-none' />
                </div>

                <button type="submit" onClick={handleLogin} className="bg-orange-500 py-2 px-5 rounded-lg text-white hover:shadow-lg focus:outline-none">
                    Log In
                </button>
            <p>{message}</p>
            {token && <p>Your Token: {token}</p>}
        </div>

    </div>
  )
}

export default Login
