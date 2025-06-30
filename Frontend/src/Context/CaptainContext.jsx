import { createContext, useContext, useState } from "react";

export const CaptainContext = createContext();

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState({
        fullName: {
            firstName: "",
            lastName: "",
        },
        email: "",
        password: "",
        vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: ""
        }
    })

    return (
        <div>
            <CaptainContext.Provider value={{captain, setCaptain}}>
                {children}
            </CaptainContext.Provider>
        </div>
    )
}

export const useCaptain = () => {
    return useContext(CaptainContext);
}

export default CaptainContextProvider;