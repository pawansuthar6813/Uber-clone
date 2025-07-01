


import { useEffect } from 'react';
import mapImage from '../assets/newMapImage.png';
import downArrow from '../assets/down_arrow.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import LocationSearchPanel from '../Components/LocationSearchPanel.jsx';
import VehiclePanel from '../Components/VehiclePanel.jsx';
import ConfirmedRide from '../Components/ConfirmedRide.jsx';
import LookingForCaptain from '../Components/LookingForCaptain.jsx';
import WaitForCaptain from '../Components/WaitForCaptain.jsx';
import { useSocket } from '../Context/SocketContext.jsx';
import { useUser } from '../Context/UserContext.jsx';
import { useRide } from '../Context/RideContext.jsx';

const UserHome = () => {

  // collect formData
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
  })

  // state to track which input field is currently active for search
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'

  // a state to check whether the search panel should go up or not
  const [panelOpen, setPanelOpen] = useState(false);

  // a state to check whether vehicle panel should open or not
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  // a state to check whether confirm ride panel should open or not
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false);

  // a state to check whether looking for captain panel should open or not
  const [lookingForCaptainPanelOpen, setLookingForCaptainPanelOpen] = useState(false);

  // a state to check whether waiting for captain panel should open or not
  const [waitForCaptainPanelOpen, setWaitForCaptainPanelOpen] = useState(false);


  const [rideAccepted, setRideAccepted] = useState(false);


  // create a ref for search panel
  const panelRef = useRef(null);
  const arrRef = useRef(null); //arrRef = reference for arrow icon

  // create a ref for vehicle Panel
  const vehiclePanelRef = useRef(null);

  // creat a ref for confirmedRide panel
  const confirmedRidePanelRef = useRef(null);

  // create a ref for lookingforcaptain panel
  const lookingForCaptainPanelRef = useRef(null);

  // create a ref for lookingforcaptain panel
  const waitForCaptainPanelRef = useRef(null);

  const { socket, sendMessage, receiveMessage } = useSocket();

  const { user, setUser } = useUser();

  

  const { ride, setRide } = useRide();

  // collect data from our form
  const changeHandler = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  // handle input field focus
  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
    setPanelOpen(true);
  }

  // handle location selection from search panel
  const handleLocationSelect = (selectedLocation) => {
    if (activeField) {
      setFormData((prevData) => ({
        ...prevData,
        [activeField]: selectedLocation
      }));
      // setPanelOpen(false);
      setActiveField(null);
    }
  }

  // create a submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
  }



  // animation for opening and closing the search Panel
  useGSAP(function () {

    gsap.set(panelRef.current, {
        transform: 'translateY(100%)',
        visibility: 'hidden'
      })

    if (panelOpen) {
      gsap.set(panelRef.current, {visibility: 'visible'})
      gsap.to(panelRef.current, {
        height: '75%',
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0'
      })
    }
  }, [panelOpen]);


  useEffect(() => {

    // register socketId in db
    sendMessage("join", { userId: user._id, userType: "user" })


  }, [])

  useEffect(() => {
    const cleanup = receiveMessage("ride-accepted", (data) => {
      console.log(data)
      setRideAccepted(true)

    })

    return cleanup; // Call cleanup on unmount
  }, [])

  useEffect(() => {
    if (rideAccepted) {
      console.log(rideAccepted)
      setConfirmedRidePanelOpen(false)
      setWaitForCaptainPanelOpen(true);
    }
  },[rideAccepted])



  // get the current search query based on active field
  const getCurrentSearchQuery = () => {
    if (!activeField) return '';
    return formData[activeField] || '';
  }

  // this useEffect is used to make sure that when panel is open, then only the arrow should be visible
  // the onClick event on arrow is written inside img tag already
  useEffect(() => {
    if (panelOpen) {
      arrRef.current.style.display = 'inline';
    } else {
      arrRef.current.style.display = 'none';
    }
  }, [panelOpen])




  return (
    <div className='overflow-hidden min-h-screen w-screen relative z-10'>
      <h3 className='text-black text-4xl font-semibold pl-3 pt-3  absolute top-0 left-0 z-10'>Uber</h3>

      <img src={mapImage} alt="Uber map" className='h-full w-screen absolute top-0 left-0 cursor-pointer' />
      <div className={`absolute h-screen w-full flex flex-col justify-end z-10 left-0 ${rideAccepted ? 'hidden' : ""}`}>
        <div className='h-[25%] w-full bg-white p-5 relative'>
          <img
            className='absolute right-2 cursor-pointer'
            ref={arrRef}
            onClick={() => {
              setPanelOpen(false);
              setActiveField(null);
            }}
            src={downArrow}
            alt="down arrow"
          />
          <h4 className='font-semibold text-2xl mb-3'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="pickup"
              id="pickup"
              placeholder='Enter pick up location'
              value={formData.pickup}
              onChange={changeHandler}
              onFocus={() => handleInputFocus('pickup')}
              className='h-[40px] w-full bg-[#eeeeee] pl-5 border rounded-lg mb-3'
            />
            <input
              type="text"
              name="destination"
              id="destination"
              placeholder='Enter destination location'
              value={formData.destination}
              onChange={changeHandler}
              onFocus={() => handleInputFocus('destination')}
              className='h-[40px] w-full bg-[#eeeeee] pl-5 border rounded-lg mb-3'
            />
          </form>


        </div>

        {/* this div contains the different locations suggested for a particular search */}
        <div ref={panelRef} className='h-0 w-full bg-white'>
          <LocationSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            searchQuery={getCurrentSearchQuery()}
            onLocationSelect={handleLocationSelect}
            activeField={activeField}
            formData={formData}
          />
        </div>

      </div>

      <VehiclePanel
        setVehiclePanelOpen={setVehiclePanelOpen}
        vehiclePanelOpen={vehiclePanelOpen}
        vehiclePanelRef={vehiclePanelRef}
        setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        setPanelOpen={setPanelOpen}
      />

      <ConfirmedRide
        confirmedRidePanelRef={confirmedRidePanelRef}
        setLookingForCaptainPanelOpen={setLookingForCaptainPanelOpen}
        setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        setVehiclePanelOpen={setVehiclePanelOpen}
        confirmedRidePanelOpen={confirmedRidePanelOpen}
        setPanelOpen={setPanelOpen}
        style={{ transform: 'translateY(100%)' }}
      />

      <LookingForCaptain
        lookingForCaptainPanelRef={lookingForCaptainPanelRef}
        lookingForCaptainPanelOpen={lookingForCaptainPanelOpen}
        setPanelOpen={setPanelOpen}
        setVehiclePanelOpen={setVehiclePanelOpen}
        setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        setLookingForCaptainPanelOpen={setLookingForCaptainPanelOpen}
        style={{ transform: 'translateY(100%)' }}
      />

      <WaitForCaptain
        waitForCaptainPanelOpen={waitForCaptainPanelOpen}
        waitForCaptainPanelRef={waitForCaptainPanelRef}
        setWaitForCaptainPanelOpen={setWaitForCaptainPanelOpen}
        setPanelOpen={setPanelOpen}
        setVehiclePanelOpen={setVehiclePanelOpen}
        setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        setLookingForCaptainPanelOpen={setLookingForCaptainPanelOpen}
        style={{ transform: 'translateY(100%)' }}
      />

    </div>
  )
}

export default UserHome;