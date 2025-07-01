import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import mapPinImage from '../assets/map-pin.png'
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import carImage from '../assets/car.png';
import ratingStarImage from '../assets/rating-star.png';
import { useState } from 'react';
import personFaceImgage from "../assets/person-face.png";
import cardImage from '../assets/bank-card.png'
import { useRide } from '../Context/RideContext.jsx';


const WaitForCaptain = ({
    time = "2",
    name = "SANTH",
    vehiclePlate = "KA15AK00-0",
    vehicleDescription = "White Suzuki S-presso LXI",
    rating = 4.5,
    mobile = 123456789,
    waitForCaptainPanelOpen,
    waitForCaptainPanelRef,
    setWaitForCaptainPanelOpen,
    setPanelOpen,
    setVehiclePanelOpen,
    setConfirmedRidePanelOpen,
    setLookingForCaptainPanelOpen

}) => {

    const [copied, setCopied] = useState(false);


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(mobile);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    useGSAP(function () {
        // Set initial state on component mount
        gsap.set(waitForCaptainPanelRef.current, {
            transform: 'translateY(100%)'
        });
    }, []);

    // animation for opening and closing the wait for captain Panel
    useGSAP(function () {
        if (waitForCaptainPanelOpen) {
            gsap.to(waitForCaptainPanelRef.current, {
                transform: 'translateY(0)'
            })

            // when wait for captain panel opens the search panel and vehicle panel and Confirmed Ride panel should go down and closed
            setPanelOpen(false);
            setVehiclePanelOpen(false);
            setConfirmedRidePanelOpen(false);
            setLookingForCaptainPanelOpen(false);

        } else {
            gsap.to(waitForCaptainPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitForCaptainPanelOpen]);


    return (
        <div id='waitForCaptainPanel' className='bg-white w-full absolute bottom-0 z-80 flex flex-col gap-2 rounded-xl' ref={waitForCaptainPanelRef}>
            <div className='w-full h-16 flex flex-row items-center'>
                <h3 className='font-semibold text-xl absolute left-2'>Meet at the pickup point</h3>
                <div className='flex flex-col w-10 pt-1 pb-1 m-2 bg-black justify-evenly items-center absolute right-3 text-white'>
                    <p>{time}</p>
                    <p>min</p>
                </div>
            </div>


            <hr className='h-0 w-full bg-red-500 border-1 border-gray-500' />

            <div className='flex flex-row justify-between items-center m-2'>
                <div>
                    <img className='h-20' src={carImage} alt="" />
                    <img className='h-12 w-12 absolute top-[116px] rounded-full outline-1 border-2 border-gray-400' src={personFaceImgage} alt="" />
                </div>
                <div className='flex flex-col items-end'>
                    <p>{name}</p>
                    <h4 className='font-semibold text-lg'>{vehiclePlate}</h4>
                    <p>{vehicleDescription}</p>
                    <div className='flex gap-2 items-center'>
                        <img className='h-[15px]' src={ratingStarImage} alt="" />
                        <p>{rating}</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center items-center gap-1 pl-[2%] pr-[2%] mb-3'>
                <h3 className='font-semibold text-bold'>Mobile Number</h3>
                <div className="w-[70%] h-[55px] flex flex-row justify-around bg-gray-300 items-center gap-2 border border-black">
                    <span className="text-lg font-mono">{mobile}</span>
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            <hr className='h-0 w-full bg-black border-1 border-gray-400' />


            <div className='flex flex-row w-full justify-start items-center gap-3 mt-2 ml-3'>
                <img className='h-5' src={mapPinImage} alt="" />
                <div className='flex flex-col items-start justify-around'>
                    <h3 className='font-semibold text-lg'>562/11-A</h3>
                    <h3>Kaikondrahalli, Bengluru, Karnataka</h3>
                </div>
            </div>

            <hr className='h-0 w-full bg-black border-1 border-black ml-10' />

            {/*  this is for drop location */}
            <div className='w-full flex justify-start items-center gap-3 ml-3 '>
                <img className='h-5' src={dropLocationImage} alt="" />
                <div className='flex flex-col items-start justify-around'>
                    <h3 className='font-semibold text-lg'>Third Wave Coffie</h3>
                    <h3>17th cross road, Pwd Quartres, 1st sector, Hsr Layout, Bengaluru, Karnataka</h3>
                </div>
            </div>

            <hr className='h-0 w-full bg-black border-1 border-black ml-10' />

            {/* this is for payment information */}
            <div className='w-full flex justify-start items-center gap-3 ml-3 mb-5'>
                <img className='h-5' src={cardImage} alt="" />
                <div className='flex flex-col items-start justify-around'>
                    <h3 className='font-semibold text-lg'>193.20</h3>
                    <h3>Cash Cash</h3>
                </div>
            </div>


        </div>
    )
}

export default WaitForCaptain