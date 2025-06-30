import React from 'react'
import traficImg from "../assets/traffic-light-image.jpg"
import { NavLink } from 'react-router-dom'

const Start = () => {
  return (
    <div id='box' className='w-screen h-screen border-2 border-black rounded-lg flex flex-col items-center overflow-hidden'>
      <div className='w-full h-[80%] bg-cover rounded-[5px, 0px 20px, 5px]' style={{ backgroundImage: `url(${traficImg})` }}>
        <h3 className='text-black text-4xl font-semibold pl-5 pt-5'>Uber</h3>
      </div>
      <div className='w-full h-[20%] flex flex-col items-center justify-center gap-3'>
        <h3 className='text-black font-semibold text-2xl'>Get started with Uber</h3>
        <NavLink to='/user/login' className='bg-black text-white h-[40px] w-[75%] text-xl cursor-pointer rounded-lg flex items-center justify-center'>Continue</NavLink>
      </div>
    </div>
  )
}

export default Start;