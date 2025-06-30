import { User as userModel } from "../models/user.model.js";
import { BlackListToken as BlackListTokenModel } from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.services.js";
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        const { fullName, email, password } = req.body;
        const { firstName, lastName } = { ...fullName };

        // hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // create an entry in database
        let user = await createUser({ firstName, lastName, email, password: hashedPassword });

        // remove password from user object
        user.password = undefined;

        // generate jwt token now because we want immidiate login after signup
        const token = user.generateAuthToken();

        // return the response
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user,
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

export const loginUser = async (req, res) => {
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

        // find user from email
        let user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            })
        }

        user.password = undefined;

        const token = user.generateAuthToken();

        const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    domain: 'localhost' // Add this if on localhost
}

        return res.cookie("token", token, options).status(200).json({
            success: true,
            user,
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

export const getUserProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json(
        {
            success: true,
            user: user
        }
    )
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.body?.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }

        await BlackListTokenModel.create({ token });

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