import {  createContext, useContext, useState } from "react";

const RideContext = createContext();

const RideContextProvider = ({ children }) => {
    const [ride, setRide] = useState({
        pickup: "",
        destination: "",
        distance: "",
        time: "",
        fare: "",
        rideStatus: "ongoing",
        vehicleType: ""
    })

    return (
        <RideContext.Provider value={{ ride, setRide }}>
            {children}
        </RideContext.Provider>
    )
}

export const useRide = () => {
    return useContext(RideContext);
}

export default RideContextProvider;