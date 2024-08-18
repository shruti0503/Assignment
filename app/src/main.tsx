import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MessagingProvider } from './Providers/MessagingContext.tsx'
import { UserProvider } from './Providers/UserContext.tsx'


createRoot(document.getElementById('root')!).render(
  
    <UserProvider>
      <MessagingProvider>
        <App />
      </MessagingProvider>
    </UserProvider>

)
