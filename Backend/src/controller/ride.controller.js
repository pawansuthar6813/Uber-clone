import { validationResult } from "express-validator";
import { createRideService, getFareService } from "../services/ride.services.js";

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

        const ride = await createRideService({ userId, pickup, destination, vehicleType, fare, distance, time })

        return res.status(201).json({
            success: true,
            ride
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// export const getFare = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 success: false,
//                 message: errors.array()
//             })
//         }

//         const { pickup, destination } = req.body;
//         let fare;
//         try {
//             fare = await getFareService(pickup, destination)

//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: "failed to get fair",
//                 data: error.message
//             })
//         }
//         if (!fare){
//             return res.status(500).json({
//                 success: false,
//                 message: "failed to get fair",
//             })
//         }
//         // console.log(fare)
//         // fare = parseInt(fare);
//         // console.log(fare);

//         // make all fares to integer
//         for(let key in fare){
//             fare[key] = parseInt(fare[key])
//         }

//         // console.log(fare)

//         return res.status(200).json({
//             success: true,
//             fare
//         })
        
        

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

export const getJourneyDetails = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        const {pickup, destination} = req.body;

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
        if (!response){
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