import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import mapsRouter from "./routes/maps.routes.js";
import rideRouter from "./routes/rides.routes.js";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(cookieParser());

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({limit: "16kb", extended: true}));

app.use(express.static("public"));

app.use("/api/users" , userRouter);
app.use("/api/captains", captainRouter);
app.use("/api/maps", mapsRouter)
app.use("/api/rides", rideRouter)


export default app;