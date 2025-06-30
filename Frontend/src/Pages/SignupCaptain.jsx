import { useState } from 'react';
import arrow from '../assets/right-arrow-icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { useCaptain } from '../Context/CaptainContext';
import axios from 'axios';

const SignupCaptain = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: "",
    vehicleType: "",
  });

  const changeHandler = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  const navigate = useNavigate();
  const {captain, setCaptain} = useCaptain();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: formData.vehicleCapacity,
        vehicleType: formData.vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
    if(response.status === 201){
      setCaptain(response.data.captain);
      localStorage.setItem("CaptainToken", response.data.token);
      navigate("/captain/home");
    }

  }

  return (
    <div className='w-screen h-screen border-2 border-black rounded-lg overflow-hidden pl-7 pr-7'>

      <h3 className='text-black text-4xl font-semibold  pt-5 mb-1'>Uber</h3>
      <img src={arrow} alt="" className='w-6 mb-5' />

      <form onSubmit={submitHandler} className='h-full w-full rounded-lg  overflow-hidden'>

        <h3 className='text-black font-semibold mt-3'>Captain's Full Name</h3>

        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder='First Name'
          value={formData.firstName}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        />

        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder='Last Name'
          value={formData.lastName}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mt-2 pl-4 outline-yellow-300 border'
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
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 mb-3 outline-yellow-300 border'
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
          className='bg-[#eeeeee] h-[40px] w-full rounded-lg pl-4 mt-2 outline-yellow-300 border mb-4'
        />

        <h3 className='text-black font-semibold '>Vehicle Information</h3>

        <input
          type="text"
          name="vehicleColor"
          id="color"
          placeholder='Color'
          value={formData.vehicleColor}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        />

        <input
          type="text"
          name="vehiclePlate"
          id="plate"
          placeholder='Plate'
          value={formData.vehiclePlate}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        />

        <input
          type="number"
          name="vehicleCapacity"
          id="capacity"
          min={1}
          placeholder='Capacity'
          value={formData.vehicleCapacity}
          onChange={changeHandler}
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        />

        <select
          name="vehicleType"
          id="vehicleType"
          onChange={changeHandler}
          value={formData.vehicleType}
          required
          className='h-[40px] w-[calc(50%-10px)] bg-[#eeeeee] rounded-lg mb-3 mr-[10px] mt-2 pl-4 outline-yellow-300 border'
        >
          <option value="" disabled>Vehicle Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="auto">Auto</option>

        </select>


        <button className='h-[40px] w-full bg-black text-white font-semibold text-xl rounded-lg mt-2 mb-3'>Register As Captain</button>

        <div className='flex justify-center gap-5'>
          <p className='inline'>Already have a account?</p>
          <NavLink to='/captain/login' className='text-blue-800'>Login here</NavLink>
        </div>

        <NavLink to='/user/signup' className='h-[40px] w-full bg-[#10b461] text-white rounded-lg flex justify-center items-center font-semibold text-lg mt-[40px]'>Register As User</NavLink>
      </form>
    </div>
  )
}

export default SignupCaptain