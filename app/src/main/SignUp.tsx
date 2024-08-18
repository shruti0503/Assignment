import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import bg from "../assets/bg.jpg" 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail]=useState('');
  const[showMssg, setShowMssg]=useState(false);
  const [mssgType,setmssgType]=useState('Success');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password && username && email) {
        const response = await axios.post('http://localhost:8080/auth/register', { username, password, email });
        
        // Success response
        setMessage("Signed in successfully!");
        setmssgType('Success');
        setShowMssg(true);
  
        setTimeout(() => {
          setMessage('');
          setShowMssg(false);
        }, 10000);

     
        setTimeout(() => {
            navigate('/login'); 
          }, 2000); 

      } else {
        alert("Please enter all the fields");
      }
    } catch (err: any) {
      // Handle errors
      setmssgType('Error');
      if (err.response) {
        setMessage(err.response.data.error || 'An Error Occurred');
      } else {
        setMessage('An Error Occurred');
      }
      setShowMssg(true);
  
      setTimeout(() => {
        setMessage('');
        setShowMssg(false);
      }, 10000);
    }
  };
  

  return (
    <div 
      className='flex w-full h-[100vh] items-center justify-center' 
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className='flex py-5 flex-col w-[50%] justify-evenly items-center rounded-lg border-2 bg-white bg-opacity-75'>
            <div className='flex justify-center items-center'>
               <h1 className='text-5xl font-bold'>Chat.io</h1>
               <img src={Logo} alt="Chat.io Logo" />
            </div>
            <h1 className='text-2xl mb-5'>Sign Up</h1>
            <div className='flex flex-col  gap-3  justify-start items-center w-full h-full'>
                <label className='font-bold' >Username</label>
                <div className='gap-1 px-3 flex w-[50%] p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
                <input placeholder='Enter Username'  value={username} onChange={(e) => setUsername(e.target.value)}  className='w-full flex bg-[#f6f6f6] outline-none' />
                </div>
                <label className='font-bold' >Password</label>
                <div className='gap-1 px-3 flex w-[50%] p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
                <input placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}  type='password' className='w-full flex bg-[#f6f6f6] outline-none' />
                </div>
                <label className='font-bold' >Email</label>
                <div className='gap-1 px-3 flex w-[50%] p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
                <input placeholder='Enter email' value={email} type='email' onChange={(e)=> setEmail(e.target.value)} className='w-full flex bg-[#f6f6f6] outline-none' />
                </div>
                <button type="submit" onClick={handleRegister} className="bg-orange-500 py-2 px-5 rounded-lg text-white hover:shadow-lg focus:outline-none">
                    Sign Up
                </button>
                <p>or</p>
                <button type="submit" onClick={()=>navigate('/login')} className="bg-yellow-400 py-2 px-5 rounded-lg text-white hover:shadow-lg focus:outline-none">
                   Login
                </button>
                {
                    showMssg && (
                        <p className={`${mssgType === "Success" ? "text-green-600" : "text-red-500"}`}>
                        {message}
                        </p>
                    )
                }

            </div>
          
        </div>
    </div>
  )
}

export default SignUp
