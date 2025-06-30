import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
import downArrow from '../assets/down_arrow.png';
import mapPinImage from '../assets/map-pin.png';
import dropLocationImage from '../assets/map-pin-drop-loc.png';
import cardImage from '../assets/bank-card.png';
import personFaceImgage from '../assets/person-face.png';
import { useNavigate } from 'react-router-dom';

const FinishRide = ({
    finishRidePanelOpen,
    setFinishRidePanelOpen
}) => {

    const arrRef = useRef(null);
    const navigate = useNavigate();

//     function arrClickHandler() {
//     setAcceptRidePanelOpen(false);
//     setRidePopUpPanelOpen(true);
//   }

    const finishRidePanelRef = useRef(null);

    useGSAP(() => {

        if (finishRidePanelOpen) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            });
            
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [finishRidePanelOpen]);


    return (
        <div ref={finishRidePanelRef} className=' fixed z-20 bottom-0 bg-white flex flex-col items-center w-screen overflow-hidden translate-y-full'>
                  {/* Header */}
                  <div>
                    <h3 className="font-bold text-xl mt-3 mb-3 absolute left-4 top-2">Confirm Ride To Start</h3>
                    <img
                      className="absolute right-3 top-4 cursor-pointer"
                      src={downArrow}
                      alt="down arrow"
                      ref={arrRef}
                    //   onClick={arrClickHandler}
                    />
                  </div>
            
                  {/* Rider Info */}
                  <div className="w-[90%] h-16 flex flex-row p-3 justify-between items-center mt-20 bg-yellow-400 rounded-lg">
                    <div className="flex flex-row justify-start gap-2 items-center">
                      <img className="h-10 w-10 rounded-full border" src={personFaceImgage} alt="rider" />
                      <h4 className="font-semibold">Harsh Patel</h4>
                    </div>
                    <h4 className="font-semibold">2.2KM</h4>
                  </div>
            
                  {/* Divider */}
                  <hr className="h-0 mt-5 w-full bg-red-500 border-1 border-gray-500" />
            
                  {/* Ride Details */}
                  <div className="w-full flex flex-col items-center gap-3 mt-3 mb-5">
                    {/* Pickup Location */}
                    <div className="flex flex-row w-full justify-start items-center gap-3 ml-3">
                      <img className="h-5" src={mapPinImage} alt="pickup" />
                      <div className="flex flex-col items-start">
                        <h3 className="font-semibold text-lg">562/11-A</h3>
                        <h3>Kaikondrahalli, Bengluru, Karnataka</h3>
                      </div>
                    </div>
            
                    <hr className="h-0 w-full bg-black border-1 border-black ml-20" />
            
                    {/* Drop Location */}
                    <div className="w-full flex justify-start items-center gap-3 ml-3">
                      <img className="h-5" src={dropLocationImage} alt="drop" />
                      <div className="flex flex-col items-start">
                        <h3 className="font-semibold text-lg">Third Wave Coffee</h3>
                        <h3>17th Cross Rd, PWD Quarters, HSR Layout, Bengaluru</h3>
                      </div>
                    </div>
            
                    <hr className="h-0 w-full bg-black border-1 border-black ml-20" />
            
                    {/* Payment Info */}
                    <div className="w-full flex justify-start items-center gap-3 ml-3">
                      <img className="h-5" src={cardImage} alt="payment" />
                      <div className="flex flex-col items-start">
                        <h3 className="font-semibold text-lg">₹193.20</h3>
                        <h3>Cash</h3>
                      </div>
                    </div>
                  </div>
            
                  
                    <button
                      className="w-[80%] h-10 bg-green-600 text-white font-semibold rounded-lg cursor-pointer mb-4"
                      onClick={() => {setFinishRidePanelOpen(false); navigate('/captain/home')}}
                    >
                      Finish Ride!
                    </button>
                  
        </div>
    )
}

export default FinishRide;