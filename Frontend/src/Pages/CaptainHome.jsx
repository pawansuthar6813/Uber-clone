import mapImage from '../assets/newMapImage.png';
import personFaceImgage from "../assets/person-face.png";
import logoutBoxImage from '../assets/logout-box.png';
import { useNavigate } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails.jsx';
import RidePopUp from '../Components/RidePopUp.jsx';
import { useEffect, useRef, useState } from 'react';
import AcceptRide from '../Components/AcceptRide.jsx';
import { useSocket } from '../Context/SocketContext.jsx';
import { useCaptain } from '../Context/CaptainContext.jsx';

const CaptainHome = () => {


  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(true);
  const ridePopUpPanelRef = useRef(null);

  const [acceptRidePanelOpen, setAcceptRidePanelOpen] = useState(false);
  const acceptRidePanelRef = useRef(null);

  const { socket, sendMessage, receiveMessage} = useSocket();
  const { captain, setCaptain } = useCaptain();

  const navigate = useNavigate();
  const logoutCaptain = async (e) => {
    navigate("/captain/logout")
  }

  useEffect(() => {

    // register captain socketId in database
    sendMessage("join", {userId: captain._id, userType: "captain"})

  })

  return (


    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Top Section - 65% */}
      <div className="h-[68%] w-full relative overflow-hidden">
        <h3 className="text-black text-4xl font-semibold pl-3 pt-3 absolute top-0 left-0 z-10">Uber</h3>
        <div onClick={logoutCaptain} className='h-10 w-10 border  rounded-full flex justify-center items-center bg-white absolute top-3 right-3 cursor-pointer z-10'>
          <img className='h-5 opacity-70' src={logoutBoxImage} />

        </div>
        <img
          src={mapImage}
          alt="Uber map"
          className="h-full w-full object-cover absolute top-0 left-0 z-0"
        />
      </div>

      {/* Bottom Section - 35% */}
      <div className="h-[32%] w-full overflow-none p-4 flex flex-col justify-start items-center gap-4">

        <div className='w-full pl-[3%] pr-[3%] flex flex-row justify-between items-center'>

          <div className='flex justify-center items-center gap-2'>
            <img className='h-10 w-10 rounded-full' src={personFaceImgage} alt="" />
            <h3 className='font-semibold'>Harsh Patel</h3>
          </div>

          <div>
            <h3 className='font-bold'>₹ 295.20</h3>
            <p className='text-gray-500'>Earned</p>
          </div>

        </div>

        <CaptainDetails />

        <RidePopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          ridePopUpPanelRef={ridePopUpPanelRef}
          ridePopUpPanelOpen={ridePopUpPanelOpen}
          setAcceptRidePanelOpen={setAcceptRidePanelOpen}
        />

        <div className='w-screen h-full'>
          <AcceptRide 
            acceptRidePanelOpen={acceptRidePanelOpen}
            setAcceptRidePanelOpen={setAcceptRidePanelOpen}
            acceptRidePanelRef={acceptRidePanelRef}
            setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          />
        </div>

      </div>

    </div>
  );
};

export default CaptainHome;
