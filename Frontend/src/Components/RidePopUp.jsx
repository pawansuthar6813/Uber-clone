
import mapPinImage from '../assets/map-pin.png'
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import cardImage from '../assets/bank-card.png'
import downArrow from '../assets/down_arrow.png'
import personFaceImgage from "../assets/person-face.png";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const RidePopUp = ({
    ridePopUpPanelRef,
    ridePopUpPanelOpen,
    setRidePopUpPanelOpen,
    setAcceptRidePanelOpen,
    ride,
    confirmRide
}) => {

    const arrRef = useRef(null);

    let {pickupLocation, destinationLocation, user, distance, duration, fare} = ride || {};

    const pickup = {
        mainAddress: ride?.pickupLocation.split(",")[0] || "",
        completeAddress: ride?.pickupLocation.split(",").slice(1).join(",") || ""
    };

    const destination = {
        mainAddress: ride?.destinationLocation.split(",")[0] || "",
        completeAddress: ride?.destinationLocation.split(",").slice(1).join(",") || ""
    };
    
    

    useEffect(() => {
        if(ride){
        setRidePopUpPanelOpen(true)
    } else {
        setRidePopUpPanelOpen(false)
    }
    }, [ride])

    function arrClickHandler() {
        setRidePopUpPanelOpen(false);
    }

    useGSAP(function () {

        gsap.set(ridePopUpPanelRef.current, {
            transform: 'translateY(100%)',
            visibility: 'hidden'
        })
    if (ridePopUpPanelOpen) {
        gsap.set(ridePopUpPanelRef.current, {visibility: "visible"})
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(0)',
            duration: 0.3,
            ease: "power2.out"
        });
    } else {
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(100%)',
            duration: 0.3,
            ease: "power2.in"
        });
    }
}, [ridePopUpPanelOpen]);


    return (
        <div className='fixed left-0 bottom-0 overflow-hidden w-full bg-white z-20 flex flex-col items-center rounded-3xl translate-y-full' ref={ridePopUpPanelRef} >
            <div>
                <h3 className='font-bold text-xl mt-3 mb-3 absolute left-4 top-2'>New Ride Available!</h3>
                <img className='absolute right-3 top-4 cursor-pointer' src={downArrow} alt="down arrow" ref={arrRef} onClick={arrClickHandler} />
            </div>

            <div className='w-[90%] h-16 flex flex-row p-3 justify-between items-center mt-20 bg-yellow-400 rounded-lg'>
                <div className='flex flex-row justify-start gap-2 items-center'>
                    <img className='h-10 w-10 rounded-full border' src={personFaceImgage} alt="" />
                    <h4 className='font-semibold'>{`${user?.fullName.firstName || ""} ${user?.fullName.lastName || ""}`}</h4>
                </div>
                <h4 className='font-semibold'>{`${distance}KM`}</h4>
            </div>


            {/* <div className=' w-full bg-black border-1 border-black'></div> */}
            <hr className='h-0 mt-5 w-full bg-red-500 border-1 border-gray-500' />

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
                        <h3 className='font-semibold text-lg'>{fare || ""}</h3>
                        <h3>Cash Cash</h3>
                    </div>
                </div>




            </div>

            <div className='w-full flex flex-col justify-center items-center gap-3 mb-10 mt-5'>
                <button onClick={confirmRide} className='w-[85%] h-10 bg-green-600 rounded-lg cursor-pointer '>Accept Ride</button>
                <button onClick={arrClickHandler} className='w-[85%] h-10 bg-gray-400 rounded-lg cursor-pointer '>Ignore</button>
            </div>
        </div>
    )
}

export default RidePopUp