import { createContext, useContext, useEffect } from "react";
import { io } from 'socket.io-client'

const socketContext = createContext();

const socket = io('http://localhost:8080');

const SocketContextProvider = ({children}) => {
    useEffect(() => {
        // basic connection logic
        socket.on('connect', () => {
            console.log("connected to server")
        })

        socket.on('disconnect', () => {
            console.log("disconnected from server")
        })
        

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback)
    
    // Return cleanup function
    return () => {
        socket.off(eventName, callback)
    }
}

    return (
        <socketContext.Provider value={{socket, sendMessage, receiveMessage}}>
            {children}
        </socketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(socketContext)
}

export default SocketContextProvider;