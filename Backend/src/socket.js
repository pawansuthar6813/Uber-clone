import { Server } from "socket.io";
import { User as userModel } from "./models/user.model.js";
import { Captain as captainModel } from "./models/captain.model.js";

let io = null;

export function initWebSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
            methods: ['GET', 'POST']
        }
    });


    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        // You can add more event listeners here as needed

        socket.on('join', async (data) => {
            const {userId, userType} = data;
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
                console.log("user joined")
            } else if (userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
                console.log("captain joined")
            }
        });

        socket.on('update-captain-location', async (data) => {
            const {userId, location} = data;
            // console.log(location)

            if(!location || !location.ltd || !location.lng){
                console.log("invalid location")
                return socket.emit('error', {message: "invalid location"})
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })

        })
    });

    io.on("disconnect", (socket) => {
        console.log(`Socket disconnected: ${socket.id}`);
    });

}

export function sendMessageToSocketId(socketId, messageObj) {
    if (io) {
        io.to(socketId).emit(messageObj.event, messageObj.data);

    } else {
        console.error("Socket.io not initialized");
    }
}