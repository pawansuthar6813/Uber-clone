import carImage from '../assets/car.png';
import autoImage from '../assets/auto.png';
import bikeImage from '../assets/bike.png'
import mapPinImage from '../assets/map-pin.png'
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import cardImage from '../assets/bank-card.png'
import downArrow from '../assets/down_arrow.png'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRide } from '../Context/RideContext.jsx';
import axios from 'axios';

const ConfirmedRide = ({
    confirmedRidePanelRef,
    setLookingForCaptainPanelOpen,
    setConfirmedRidePanelOpen,
    setVehiclePanelOpen,
    confirmedRidePanelOpen,
    setPanelOpen
}) => {
    const arrRef = useRef(null);

    const { ride, setRide } = useRide();

    const getVehicleImage = () => {
        switch (ride.vehicleType) {
            case 'car':
                return carImage;
            case 'auto':
                return autoImage;
            case 'motorcycle':
                return bikeImage;
            default:
                return carImage; // fallback
        }
    };

    // Get the current vehicle image
    const currentVehicleImage = getVehicleImage();

    // extracting the mainAdress and complete adresses for both pickup and destination
    const pickup = {
        mainAddress: ride.pickup.split(",")[0],
        completeAddress: ride.pickup.split(",").slice(1).join(",")
    };

    const destination = {
        mainAddress: ride.destination.split(",")[0],
        completeAddress: ride.destination.split(",").slice(1).join(",")
    };

    // console.log(imgPath)

    const arrClickHandler = () => {
        setConfirmedRidePanelOpen(false);

        // now show the previous panel that is vehicle panel
        setVehiclePanelOpen(true);
    }

    const bookRide = async () => {

        // create ride in backend
        const path = 'http://localhost:8080/api/rides/create';
        const token = localStorage.getItem("UserToken");

        try {
            const response = await axios.post(path, {
                pickup: ride.pickup,
                destination: ride.destination,
                vehicleType: ride.vehicleType,
                distance: ride.distance,
                time: ride.time,
                fare: ride.fare[ride.vehicleType]
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.data.success){
                throw new Error("failed to create ride, Internal Server Error")
            }

            // now update fare
            // ride.fare = ride.fare[ride.vehicleType]

            console.log(ride);

            setLookingForCaptainPanelOpen(true)


        } catch (error) {
            console.log(error);
        }

    }

    useGSAP(function () {
    // Set initial position when component mounts
    gsap.set(confirmedRidePanelRef.current, {
        transform: 'translateY(100%)',
        visibility: 'hidden'
    });

    if (confirmedRidePanelOpen) {
        gsap.set(confirmedRidePanelRef.current, {visibility: 'visible'} )
        gsap.to(confirmedRidePanelRef.current, {
            transform: 'translateY(0)',
            duration: 0.3, // Add duration for smoother animation
            ease: "power2.out" // Add easing for better feel
        });

        // when wait for captain panel opens the search panel and vehicle panel and Confirmed Ride panel should go down and closed
        setPanelOpen(false);
        setVehiclePanelOpen(false);

    } else {
        gsap.set(confirmedRidePanelRef.current, {visibility: 'hidden'} )
        gsap.to(confirmedRidePanelRef.current, {
            transform: 'translateY(100%)',
            duration: 0.3,
            ease: "power2.out"
        });
    }
}, [confirmedRidePanelOpen]);

    return (
        <div id='confirmRidePanel' className='absolute left-0 bottom-0 w-full bg-white z-40 flex flex-col items-center rounded-3xl translate-y-full' ref={confirmedRidePanelRef}>
            <h3 className='font-bold text-xl mt-3 absolute left-4 top-0'>Book Your Ride</h3>
            <img className='absolute right-3 top-2 cursor-pointer' ref={arrRef} onClick={arrClickHandler} src={downArrow} alt="down arrow" />

            <img className='h-28 mt-8 mb-2 ' src={currentVehicleImage} />

            {/* <div className=' w-full bg-black border-1 border-black'></div> */}
            <hr className='h-0 w-full bg-red-500 border-1 border-gray-500' />

            <div className='w-full flex flex-col items-center gap-3 mt-3 mb-5'>

                {/*  this is for pickup location */}
                <div className='flex flex-row w-full justify-start items-center gap-3 ml-3'>
                    <img className='h-5' src={mapPinImage} alt="" />
                    <div className='flex flex-col items-start justify-around'>
                        <h3 className='font-semibold text-lg'>{pickup.mainAddress}</h3>
                        <h3>{pickup.completeAddress}</h3>
                    </div>
                </div>

                <hr className='h-0 w-full bg-black border-1 border-black ml-20' />

                {/*  this is for drop location */}
                <div className='w-full flex justify-start items-center gap-3 ml-3'>
                    <img className='h-5' src={dropLocationImage} alt="" />
                    <div className='flex flex-col items-start justify-around'>
                        <h3 className='font-semibold text-lg'>{destination.mainAddress}</h3>
                        <h3>{destination.completeAddress}</h3>
                    </div>
                </div>

                <hr className='h-0 w-full bg-black border-1 border-black ml-20' />

                {/* this is for payment information */}
                <div className='w-full flex justify-start items-center gap-3 ml-3'>
                    <img className='h-5' src={cardImage} alt="" />
                    <div className='flex flex-col items-start justify-around'>
                        <h3 className='font-semibold text-lg'>{`₹ ${ride.fare[ride.vehicleType]}`}</h3>
                        <h3>Cash Cash</h3>
                    </div>
                </div>

                <hr className='h-0 w-full bg-black border-1 border-black ml-20' />


            </div>

            <div className='w-full flex justify-center mb-10 mt-5'>
                <button onClick={bookRide} className='w-[85%] h-10 bg-green-600 rounded-lg cursor-pointer '>Book Ride</button>
            </div>
        </div>
    )
}

export default ConfirmedRide