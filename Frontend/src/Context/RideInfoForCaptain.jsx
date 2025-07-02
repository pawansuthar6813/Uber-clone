import { useState, useContext, createContext } from "react";

const rideInfoForCaptainContext = createContext();

const RideInfoContextProvider = ({children}) => {
    const [ride, setRide] = useState(null);

    return (
        <rideInfoForCaptainContext.Provider value={{ride, setRide}}>
            {children}
        </rideInfoForCaptainContext.Provider>
    )
}

export const useRideInfoForCaptain = () => {
    return useContext(rideInfoForCaptainContext);
}

export default RideInfoContextProvider;