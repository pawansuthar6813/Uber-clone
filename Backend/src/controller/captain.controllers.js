import { Captain as CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";
import { BlackListToken as BlackListTokenModel } from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
    try {
        // check if given fields have valid values
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        // extract data from req body
        const { fullName, email, password, vehicle } = req.body;
        const { firstName, lastName } = { ...fullName }
        const { color, plate, capacity, vehicleType } = { ...vehicle };

        // hash the password
        const hashedPassword = await CaptainModel.hashPassword(password);

        // create an entry in database
        let captain = await createCaptain({ firstName, lastName, email, password: hashedPassword, color, plate, capacity, vehicleType });

        // remove password from captain object
        captain.password = undefined;

        // generate jwt token now because we want immidiate login after signup
        const token = captain.generateAuthToken();

        // return the response
        return res.status(201).json({
            success: true,
            message: "captain created successfully",
            captain,
            token
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: err.message
        })
    }
}

export const loginCaptain = async (req, res) => {
    try {

        // check if given fields have valid values
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        // extract data from req body
        const { email, password } = req.body;

        // find captain from email
        let captain = await CaptainModel.findOne({email}).select("+password");
        if(!captain){
            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            })
        }

        // check, is password correct or not
        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            }) 
        }

        captain.password = undefined;

        const token = captain.generateAuthToken();

        const options = {
            expires: new Date(Date.now() + 24*60*60*1000), // expires in 24 hrs
            httpOnly: true
        }

        return res.cookie("token", token, options).status(200).json({
            success: true,
            captain,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: err.message
        })
    }
}

export const getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    return res.status(200).json(
        {
            success: true,
            captain: captain
        }
    )
}

export const logoutCaptain = async (req, res) => {
    try {
        const token = req.body?.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }

        await BlackListTokenModel.create({token});

        // now remove token from cookies
        res.clearCookie("token").status(200).json({
            success: true,
            message: "logout successfull"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            data: err.message,
            message: "internal server error"
        })
    }
}