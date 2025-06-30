import carImage from '../assets/car.png';
import autoImage from '../assets/auto.png';
import bikeImage from '../assets/bike.png'
import mapPinImage from '../assets/map-pin.png'
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import cardImage from '../assets/bank-card.png'
import downArrow from '../assets/down_arrow.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useRide } from '../Context/RideContext.jsx';

const LookingForCaptain = ({
    lookingForCaptainPanelRef,
    lookingForCaptainPanelOpen,
    setPanelOpen,
    setVehiclePanelOpen,
    setConfirmedRidePanelOpen,
    setLookingForCaptainPanelOpen
}) => {

    const arrRef = useRef(null);

    const { ride, setRide } = useRide();

    // function to get vehicle image dynamically
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

    const arrClickHandler = () => {
        setLookingForCaptainPanelOpen(false);

        // now show the previous panel that is vehicle panel
        setConfirmedRidePanelOpen(true);
    }

    // animation and logic for open and close of Wait for Captain panel
    // Fixed LookingForCaptain component - corrected GSAP syntax
    useGSAP(function () {
        // Fix: Proper initial positioning
        gsap.set(lookingForCaptainPanelRef.current, {
            transform: 'translateY(100%)',
            visibility: 'hidden'
        });

        if (lookingForCaptainPanelOpen) {
            gsap.set(lookingForCaptainPanelRef.current, { visibility: 'visible' })
            gsap.to(lookingForCaptainPanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.3,
                ease: "power2.out"
            });

            // when looking for captain panel opens, close other panels
            setPanelOpen(false);
            setVehiclePanelOpen(false);
            setConfirmedRidePanelOpen(false);

        } else {
            gsap.set(lookingForCaptainPanelRef.current, { visibility: 'hidden' })
            gsap.to(lookingForCaptainPanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [lookingForCaptainPanelOpen]);


    return (
        <div id='lookingForCaptainPanel' className='absolute left-0 bottom-0 w-full bg-white z-50 flex flex-col items-center rounded-3xl translate-y-full' ref={lookingForCaptainPanelRef}>
            <h3 className='font-bold text-xl mt-3 absolute left-4 top-0'>Looking for Captain...</h3>
            <img className='absolute right-3 top-1 cursor-pointer' ref={arrRef} onClick={arrClickHandler} src={downArrow} alt="down arrow" />

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


        </div>
    )
}

export default LookingForCaptain;