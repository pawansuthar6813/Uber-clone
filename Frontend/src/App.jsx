import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./Pages/Start.jsx";
import LoginUser from "./Pages/LoginUser.jsx";
import SignupUser from "./Pages/SignupUser.jsx";
import LoginCaptain from "./Pages/LoginCaptain.jsx";
import SignupCaptain from './Pages/SignupCaptain.jsx';
import UserHome from './Pages/UserHome.jsx';
import CaptainHome from './Pages/CaptainHome.jsx';
import UserProtectWrapper from './Pages/UserProtectWrapper.jsx';
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper.jsx';
import LogoutUser from './Pages/LogoutUser.jsx';
import LogoutCaptain from './Pages/LogoutCaptain.jsx';
import Riding from './Pages/Riding.jsx';
import CaptainRiding from './Pages/CaptainRiding.jsx';

const App = () => {
  
  return (
      <div className='h-screen w-screen bg-white flex justify-center items-center rounded'>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/user/login' element={<LoginUser />} />
          <Route path='/user/signup' element={<SignupUser />} />
          <Route path='/captain/login' element={<LoginCaptain />} />
          <Route path='/captain/signup' element={<SignupCaptain />} />
          <Route path='/user/home' element={<UserProtectWrapper><UserHome /></UserProtectWrapper>} />
          <Route path='/user/logout' element={<UserProtectWrapper><LogoutUser /></UserProtectWrapper>} />
          <Route path='/captain/logout' element={<CaptainProtectWrapper><LogoutCaptain /></CaptainProtectWrapper>} />
          <Route path='/captain/home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
          <Route path='/user/riding' element={<UserProtectWrapper><Riding /></UserProtectWrapper>} />
          <Route path='/captain/riding' element={<CaptainProtectWrapper><CaptainRiding /></CaptainProtectWrapper>} />
        </Routes> 
      </div>
  )
}

export default App