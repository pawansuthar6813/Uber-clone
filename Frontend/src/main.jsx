
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import CaptainContextProvider from './Context/CaptainContext.jsx'
import RideContextProvider from './Context/RideContext.jsx'
import SocketContextProvider from './Context/SocketContext.jsx'
import RideInfoContextProvider from './Context/RideInfoForCaptain.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RideContextProvider>
      <CaptainContextProvider>
        <UserContextProvider>
          <SocketContextProvider>
            <RideInfoContextProvider>
              <App />
            </RideInfoContextProvider>
          </SocketContextProvider>
        </UserContextProvider>
      </CaptainContextProvider>
    </RideContextProvider>
  </BrowserRouter>
)
