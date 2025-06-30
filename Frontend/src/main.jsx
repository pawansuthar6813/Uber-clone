import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import CaptainContextProvider from './Context/CaptainContext.jsx'
import RideContextProvider from './Context/RideContext.jsx'
import SocketContextProvider from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RideContextProvider>
      <CaptainContextProvider>
        <UserContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </UserContextProvider>
      </CaptainContextProvider>
    </RideContextProvider>
  </BrowserRouter>
)
