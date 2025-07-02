


import React, { useEffect } from 'react'
import personImg from '../assets/person.png'

const RideOption = ({
  name, 
  vehicleType,
  vehicleCapacity, 
  distance, 
  time, 
  src, 
  price, 
  onVehicleSelect,
  isSelected
}) => {

  const handleClick = () => {
    onVehicleSelect(vehicleType);
  };

  // Optional: Log when selection state changes
//   useEffect(() => {
//     if (isSelected) {
//       console.log(`✅ ${name} is now selected`);
//     }
//   }, [isSelected, name]);

  return (
    <div 
      onClick={handleClick} 
      className={`flex justify-between items-center px-3 border-2 rounded-lg m-3 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-black bg-gray-100 shadow-md' 
          : 'border-gray-200 bg-gray-50 hover:border-gray-300 active:border-black'
      }`}
    >
      <div className='flex justify-between py-3'>
        <img src={src} className='h-12 mt-3' />
        <div className='flex flex-col items-start'>
          <div className='flex justify-center items-center px-3'>
            <h3 className={`font-semibold ${isSelected ? 'text-black' : 'text-gray-800'}`}>
              {name}
              {isSelected && <span className='ml-2 text-green-600'>✓</span>}
            </h3>
            <img className='ml-3 h-3' src={personImg} />
            <h4 className={isSelected ? 'text-black' : 'text-gray-600'}>{vehicleCapacity}</h4>
          </div>
          <div className='flex flex-col justify-center gap-1 px-3'>
            <h4 className={isSelected ? 'text-black' : 'text-gray-600'}>{distance}</h4>
            <h4 className={isSelected ? 'text-black' : 'text-gray-600'}>{time}</h4>
          </div>
        </div>
      </div>
      <div className='self-start pt-3 font-semibold'>
        <h3 className={`self-start ${isSelected ? 'text-black font-bold' : 'text-gray-800'}`}>
          ₹{price}
        </h3>
      </div>
    </div>
  )
}

export default RideOption