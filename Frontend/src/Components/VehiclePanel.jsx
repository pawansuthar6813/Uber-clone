




import doubleDownArrow from '../assets/double-down-arrow.png';
import RideOption from './RideOption.jsx';
import carImage from '../assets/car.png'
import autoImage from '../assets/auto.png'
import bikeImage from '../assets/bike.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRide } from '../Context/RideContext.jsx';
import axios from 'axios';

const VehiclePanel = ({
  setVehiclePanelOpen,
  vehiclePanelRef,
  setConfirmedRidePanelOpen,
  vehiclePanelOpen,
  setPanelOpen
}) => {
  const arrClickHandler = () => {
    setVehiclePanelOpen(false);
    setPanelOpen(true);
  }

  const { ride, setRide } = useRide();

  // Function to handle vehicle selection
  const handleVehicleSelect = (vehicleType) => {

    // Update the ride context with selected vehicle type
    setRide(prevRide => ({
      ...prevRide,
      vehicleType: vehicleType
    }));

    // Open the confirmed ride panel
    setConfirmedRidePanelOpen(true);
  };

  // animation and logic for open and close of vehicle panel
  // Fixed VehiclePanel GSAP animation
  useGSAP(function () {
    // Add: Ensure initial positioning is set
    gsap.set(vehiclePanelRef.current, {
      transform: 'translateY(100%)'
    });

    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.3,
        ease: "power2.out"
      });

      // when vehicle panel opens the search panel should go down and closed
      setPanelOpen(false);

    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [vehiclePanelOpen]);


  
  return (
    <div id='vehiclePanel' className='absolute bottom-0 bg-white z-30 w-full rounded-lg translate-y-full' ref={vehiclePanelRef}>
      <div className='h-5 flex justify-center'>
        <img src={doubleDownArrow} onClick={arrClickHandler} className='cursor-pointer' />
      </div>
      <h3 className='text-xl font-semibold m-3 mb-5 mt-5 '>Choose Vehicle</h3>

      <RideOption
        name="UberGo"
        vehicleType="car"
        vehicleCapacity="4"
        distance={`${ride.distance} KM`}
        time={`${ride.time} min away`}
        src={carImage}
        price={ride.fare.car}
        onVehicleSelect={handleVehicleSelect}
        isSelected={ride.vehicleType === 'car'}
      />

      <RideOption
        name="Moto"
        vehicleType="motorcycle"
        vehicleCapacity="1"
        distance={`${ride.distance} KM`}
        time={`${Math.round(ride.time * 0.8)} min away`}
        src={bikeImage}
        price={ride.fare.motorcycle}
        onVehicleSelect={handleVehicleSelect}
        isSelected={ride.vehicleType === 'motorcycle'}
      />

      <RideOption
        name="UberAuto"
        vehicleType="auto"
        vehicleCapacity="3"
        distance={`${ride.distance} KM`}
        time={`${Math.round(ride.time * 1.2)} min away`}
        src={autoImage}
        price={ride.fare.auto}
        onVehicleSelect={handleVehicleSelect}
        isSelected={ride.vehicleType === 'auto'}
      />
    </div>
  )
}

export default VehiclePanel