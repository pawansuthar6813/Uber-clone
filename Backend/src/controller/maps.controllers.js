import { validationResult } from "express-validator";
import { getAddressCoordinate, getDistanceTime, getAddressSuggestions } from "../services/maps.services.js";

export const getCoordinates = async (req, res) => {
    // console.log("debug point 1")
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        // console.log("debug point 2");
        const {address} = req.body;
        // console.log("debug point 3")
        const coordinates = await getAddressCoordinate(address);
        console.log(coordinates)

        if(coordinates){
            // console.log("debug point 4")
            return res.status(200).json({
                success: true,
                message: "coordinates found",
                coordinates
            })
        }
        // console.log("debug point 5")
        return res.status(400).json({
            success: false,
            message: "no coordinates found"
        })
        // console.log("debug point 6")
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}

export const getDistanceAndTime = async (req, res) => {
    
    try {

        // perform validations
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        // extract addresses from req body
        const { origin, destination } = req.body;

        const response = await getDistanceTime(origin, destination);

        if(!response){
            throw new Error("failed to get distance and time")
        }

        return res.status(200).json({
            success: true,
            data: response
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const getAutoCompleteSuggestions = async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        const {input} = req.body;
        // console.log(input)
        const response = await getAddressSuggestions(input);

        if(!response){
            throw new Error("failed to get suggestions")
        }

        return res.status(200).json({
            success: true,
            data: response
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

