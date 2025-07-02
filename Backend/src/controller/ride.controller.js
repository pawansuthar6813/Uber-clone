import { validationResult } from "express-validator";
import { createRideService, getFareService, confirmRideService } from "../services/ride.services.js";
import { getAddressCoordinate, getCaptainsNearMe } from "../services/maps.services.js";
import { sendMessageToSocketId } from "../socket.js";
import { User as userModel } from "../models/user.model.js";
import { Ride as rideModel } from "../models/ride.model.js";

export const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        // extract userId from token
        const userId = req.user._id;

        const { pickup, destination, vehicleType, fare, distance, time } = req.body;

        let ride = await createRideService({ userId, pickup, destination, vehicleType, fare, distance, time })

        res.status(201).json({
            success: true,
            ride
        })

        const { ltd, lng, data } = await getAddressCoordinate(pickup);


        const availableCaptians = await getCaptainsNearMe(ltd, lng, 3);

        // now we have to send the ride info to all captains but before that we have to remove
        // otp from the ride object
        ride.otp = undefined;
        const rideObj = ride.toObject();
        rideObj.user = await userModel.findById(userId).select("-socketId -createdAt -updatedAt -_id -__v");

        availableCaptians.map((captain) => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideObj
            })

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        // extract data from body
        const { userId, captainId, rideId } = req.body;

        const { ride, socketId } = await confirmRideService(userId, captainId, rideId);


        res.status(200).json({
            success: true,
            data: "ride accepted"
        });

        sendMessageToSocketId(socketId, {
            event: 'ride-accepted',
            data: ride
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        const { rideId, otp } = req.body;

        const ride = await rideModel.findById(rideId).select("+otp").populate('captainId').populate('userId');

        if (!ride) {
            return res.status(400).json({
                success: false,
                message: "invalid rideId"
            })
        }

        if (ride.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        }

        await rideModel.findByIdAndUpdate(rideId, {
            $set: { status: "ongoing" }
        })

        res.status(200).json({
            success: true,
            messaga: "ride started"
        })

        sendMessageToSocketId(ride.userId.socketId, {
            event: 'ride-started',
            data: ride
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const finishRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        const {rideId} = req.body;

        // const ride = await rideModel.findById(rideId).populate("userId");
        
        const ride = await rideModel.findByIdAndUpdate(rideId, {
            $set: {
                status: "completed"
            }
        }, {new: true}).populate("userId")

        if(!ride){
            return res.status(400).json({
                success: false,
                message: "invalid rideId"
            })
        }
        console.log("last step of ride : ", ride)

        res.status(200).json({
            success: true,
            message: "ride completed successfuly"
        })

        sendMessageToSocketId(ride.userId.socketId, {
            event: 'ride-finished',
            data: "ride finished successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const cancelRideByCaptain = async (req, res) => {
    try {
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        } 

        const {rideId} = req.body;
        const ride = await rideModel.findByIdAndUpdate(rideId, {
            $set: {
                status: 'cancelled'
            }
        },{new: true}).populate("userId");

        if(!ride){
            return res.status(400).json({
                success: false,
                messaga: "wrong userId"
            })
        }

        res.status(200).json({
            success: true,
            message: "ride cancelled successfully"
        })

        sendMessageToSocketId(ride.userId.socketId,{
            event: 'ride-cancelled',
            data: "ride cancelled successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const getJourneyDetails = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        const { pickup, destination } = req.body;

        // find fare
        // getFareService also sends distance in km and time in min
        let response;
        try {
            response = await getFareService(pickup, destination)

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "failed to get fair1",
                data: error.message
            })
        }
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "failed to get fair2",
            })
        }

        const data = {
            fare: response.fare,
            distance: response.distanceInKm,
            time: response.timeInMin
        }

        return res.status(200).json({
            success: true,
            data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



