import React from 'react'
import timeClockImage from '../assets/single-line-time-clock.png';
import speedoMeterImage from '../assets/speedometer.png';
import bookletImage from '../assets/booklet.png';

const CaptainDetails = () => {
  return (
    <div className='flex flex-row w-[90%] bg-gray-100 justify-center rounded-lg'>

          <div className='flex flex-col text-center items-center justify-center gap-1 p-3'>
            <img className='h-5' src={timeClockImage} alt="" />
            <h3 className='font-bold'>10.2</h3>
            <p className='text-gray-500'>Hours Online</p>
          </div>

          <div className='flex flex-col text-center items-center justify-center gap-1 p-3'>
            <img className='h-5' src={speedoMeterImage} alt="" />
            <h3 className='font-bold'>10.2</h3>
            <p className='text-gray-500'>Hours Online</p>
          </div>

          <div className='flex flex-col text-center items-center justify-center gap-1 p-3'>
            <img className='h-5' src={bookletImage} alt="" />
            <h3 className='font-bold'>10.2</h3>
            <p className='text-gray-500'>Hours Online</p>
          </div>

        </div>
  )
}

export default CaptainDetails