import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../Context/UserContext';

const LoginUser = () => {

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
  const {user, setUser} = useUser();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200){
      const user = response.data.user;
      setUser(user);
      localStorage.setItem("UserToken", response.data.token);
      navigate("/user/home");
    }
  }

  return (
    <div className='w-screen h-screen border-2 border-black rounded-lg overflow-hidden pl-7 pr-7'>

      <h3 className='text-black text-4xl font-semibold  pt-5 mb-5'>Uber</h3>

      <form onSubmit={submitHandler} className='h-full w-full rounded-lg overflow-hidden'>

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

        <button className='h-[40px] w-full bg-black text-white font-semibold text-xl rounded-lg mt-5 mb-3'>Login</button>

        <div className='flex justify-center gap-5'>
          <p className='inline'>New User?</p>
          <NavLink to='/user/signup' className='text-blue-800'>Create New Account</NavLink>
        </div>

        <NavLink to='/captain/login' className='h-[40px] w-full bg-[#f3a515] text-white rounded-lg flex justify-center items-center font-semibold text-lg mt-[220px]'>Login As Captain</NavLink>
      </form>
    </div>
  )
}

export default LoginUser