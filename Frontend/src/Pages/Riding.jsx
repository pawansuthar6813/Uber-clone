import mapImage from '../assets/newMapImage.png';
import carImage from '../assets/car.png';
import personFaceImgage from "../assets/person-face.png";
import cardImage from '../assets/bank-card.png'
import ratingStarImage from '../assets/rating-star.png';
import mapPinImage from '../assets/map-pin.png'
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import homeIcon from '../assets/home-icon.png';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../Context/RideContext.jsx';
import { useSocket } from '../Context/SocketContext.jsx';
import { useEffect } from 'react';

const Riding = ({
  vehicleDescription = "White Suzuki S-presso LXI",
  rating = 4.5,
  mobile = 123456789,
}) => {

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/user/home')
  }

  const { ride, setRide } = useRide();
  const { pickup, destination, distance, duration, fare, captain, vehicle } = ride;

  const pickupLocation = {
    mainAddress: pickup.split(",")[0] || "",
    completeAddress: pickup.split(",").slice(1).join(",") || ""
  };

  const destinationLocation = {
    mainAddress: destination.split(",")[0] || "",
    completeAddress: destination.split(",").slice(1).join(",") || ""
  };

  const captainName = `${captain?.fullName?.firstName} ${captain?.fullName?.lastName || ''}`

  const {sendMessage, receiveMessage} = useSocket();

  useEffect(() => {

    receiveMessage("ride-finished", (data) => {
      navigate('/user/home');
    })

  },[])

  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col'>
      <div onClick={navigateHome} className='h-10 w-10 rounded-full bg-white flex justify-center items-center absolute right-2 top-2 border-2 border-gray-600 cursor-pointer'>
        <img className='h-6' src={homeIcon} alt="" />
      </div>
      <h3 className='text-black text-4xl font-semibold pl-3 pt-3 absolute top-0 left-0 z-20'>Uber</h3>

      {/* Map section - flexible height but minimum 30% */}
      <div className='flex-1 min-h-[30vh]'>
        <img src={mapImage} alt="Uber map" className='h-full w-full object-cover' />
      </div>

      {/* Content section - flexible height */}
      <div className='flex-1 flex flex-col z-10'>
        <div className='flex-1 px-2'>
          <div className='flex flex-row justify-between items-center m-2'>
            <div className='relative'>
              <img className='h-16' src={carImage} alt="" />
              <img className='h-10 w-10 absolute top-0 left-0 rounded-full outline-1 border-2 border-gray-400' src={personFaceImgage} alt="" />
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-sm'>{captainName}</p>
              <h4 className='font-semibold text-base'>{vehicle.plate}</h4>
              <p className='text-sm'>{vehicleDescription}</p>
              <div className='flex gap-2 items-center'>
                <img className='h-[12px]' src={ratingStarImage} alt="" />
                <p className='text-sm'>{rating}</p>
              </div>
            </div>
          </div>

          <hr className='h-0 w-full bg-black border-1 border-gray-400 mb-2' />

          {/* pickup location */}
          <div className='flex flex-row w-full justify-start items-center gap-3 mt-1 mb-2 ml-3'>
            <img className='h-4' src={mapPinImage} alt="" />
            <div className='flex flex-col items-start justify-around'>
              <h3 className='font-semibold text-base'>{pickupLocation.mainAddress}</h3>
              <h3 className='text-sm'>{pickupLocation.completeAddress}</h3>
            </div>
          </div>

          <hr className='h-0 w-full bg-black border-1 border-black ml-10 mb-2' />

          {/* drop location */}
          <div className='w-full flex justify-start items-center gap-3 ml-3 mb-2'>
            <img className='h-4' src={dropLocationImage} alt="" />
            <div className='flex flex-col items-start justify-around'>
              <h3 className='font-semibold text-base'>{destinationLocation.mainAddress}</h3>
              <h3 className='text-sm'>{destinationLocation.completeAddress}</h3>
            </div>
          </div>

          <hr className='h-0 w-full bg-black border-1 border-black ml-10 mb-2' />

          {/* payment information */}
          <div className='w-full flex justify-start items-center gap-3 ml-3 mb-3'>
            <img className='h-4' src={cardImage} alt="" />
            <div className='flex flex-col items-start justify-around'>
              <h3 className='font-semibold text-base'>{`₹${fare}`}</h3>
              <h3 className='text-sm'>Cash Cash</h3>
            </div>
          </div>
        </div>

        {/* Button - always visible at the bottom */}
        <div className='flex-shrink-0 p-3'>
          <button className='w-full bg-black text-white py-3 rounded-md font-semibold'>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Riding