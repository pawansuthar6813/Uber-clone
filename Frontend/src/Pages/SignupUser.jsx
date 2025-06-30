import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const SignupUser = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  const {user, setUser} = useUser();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      email: formData.email,
      password: formData.password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201){
      const user = response.data.user;
      setUser(user);
      localStorage.setItem("UserToken", response.data.token);
      // console.log(response.data.token)
      navigate("/user/home");
    }

  }

  return (
    <div className='w-screen h-screen border-2 border-black rounded-lg overflow-hidden pl-7 pr-7'>

      <h3 className='text-black text-4xl font-semibold  pt-5 mb-1'>Uber</h3>

      <form onSubmit={submitHandler} className='h-full w-full rounded-lg  overflow-hidden'>

      <h3 className='text-black font-semibold mt-2'>Full Name</h3>

        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder='First Name'
          value={formData.firstName}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-6 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        />

        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder='Last Name'
          value={formData.lastName}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-6 mt-2 pl-4 outline-yellow-300 border'
        />

        <label htmlFor="email">
          <h3 className='text-black font-semibold'>Email</h3>
        </label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder='email@example.com'
          required
          value={formData.email}
          onChange={changeHandler}
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 mb-6 outline-yellow-300 border'
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
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 outline-yellow-300 border mb-6'
        />

        <button className='h-[40px] w-full bg-black text-white font-semibold text-xl rounded-lg mt-2 mb-3'>Register</button>

        <div className='flex justify-center gap-5'>
          <p className='inline'>Already have a account?</p>
          <NavLink to='/user/login' className='text-blue-800'>Login here</NavLink>
        </div>

        <NavLink to='/captain/signup' className='h-[40px] w-full bg-[#f3c164] text-white rounded-lg flex justify-center items-center font-semibold text-lg mt-[100px]'>Register As Captain</NavLink>
      </form>
    </div>
  )
}

export default SignupUser