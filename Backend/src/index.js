import dotevn from "dotenv";
dotevn.config({path: "./.env"});
// import {initWebSocket } from './socket.js'?

import connectDB from "./db/connectDB.js";
import app from "./app.js";
import { createServer } from "http";
import { initWebSocket } from "./socket.js";

connectDB()
.then(() => {
    const port = process.env.PORT || 4000;
    const server = createServer(app);

    // Initialize WebSocket
    initWebSocket(server);

    server.listen(port , () => {
        console.log("server is running on port : " , port )
    })
})
.catch(() => {
    console.log("server is not live because mongodb is not connected");
})