import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import axios from 'axios'
interface User {
  id: number | null;
  username: string;
  token: string | null;
}

interface UserContextType {
  user: User;
  allUsers:any;
  login: (id: number, username: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: null, username: '', token: null });
  const [allUsers,setAllUsers]=useState([]);

  const login = (id: number, username: string, token: string) => {
    setUser({ id, username, token });
  };
  console.log("curruser", user)

  const logout = () => {
    setUser({ id: null, username: '', token: null });
  };

  const getAllUser=async()=>{
    const resp=await axios.get('http://localhost:8080/users');
    console.log("allusers", resp.data);
    setAllUsers(resp.data)

  }

  useEffect(()=>{
    if(user.id!){
      console.log("user.id",user.id)
      getAllUser()

    }

  },[user])

  return (
    <UserContext.Provider value={{ user, login, logout ,allUsers}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
