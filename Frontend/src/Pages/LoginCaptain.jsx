import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import arrow from '../assets/right-arrow-icon.png';
import { useCaptain } from '../Context/CaptainContext';
import axios from 'axios';

const LoginCaptain = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData( (prevData) => {
      return {
        ...prevData,
        [e.target.name] : e.target.value
      }
    })
  }

  const navigate = useNavigate();
  const {captain, setCaptain} = useCaptain();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: formData.email,
      password: formData.password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
    if(response.status === 200){
      const captain = response.data.user;
      setCaptain(captain);
      localStorage.setItem("CaptainToken", response.data.token);
      navigate("/captain/home");
    }

  }

  return (

    <div className='w-screen h-screen border-2 border-black rounded-lg overflow-hidden pl-7 pr-7'>

      <h3 className='text-black text-4xl font-semibold  pt-5 mb-1'>Uber</h3>
      <img src={arrow} alt="" className='w-6 mb-5' />

      <form onSubmit={submitHandler} className='h-full w-full rounded-lg  overflow-hidden'>

        <label htmlFor="email">
          <h3 className='text-black font-semibold'>What's your email</h3>
        </label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder='email@example.com'
          required
          value={formData.email}
          onChange={changeHandler}
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 mb-5 outline-yellow-300 border'
        />

        <label htmlFor="password">
          <h3 className='text-black font-semibold '>Password</h3>
        </label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder='Enter password'
          required
          value={formData.password}
          onChange={changeHandler}
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 outline-yellow-300 border mb-3'
        />

        <button className='h-[40px] w-full bg-black text-white font-semibold text-xl rounded-lg mt-5 mb-3'>Login As Captain</button>

        <div className='flex justify-center gap-5'>
          <p className='inline'>New User?</p>
          <NavLink to='/captain/signup' className='text-blue-800'>Create New Account</NavLink>
        </div>

        <NavLink to='/user/login' className='h-[40px] w-full bg-[#10b461] text-white rounded-lg flex justify-center items-center font-semibold text-lg mt-[220px]'>Login As User</NavLink>
      </form>
    </div>

  )
}

export default LoginCaptain