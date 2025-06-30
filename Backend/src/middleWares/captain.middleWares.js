import jwt from "jsonwebtoken";
import { Captain, Captain as CaptainModel } from "../models/captain.model.js";
import { BlackListToken as BlackListTokenModel } from "../models/blacklistToken.model.js";

export const AuthCaptain = async (req, res, next) => {

    // extract token
    const token = req.body?.token || req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorized1"
        })
    }

    // check if token blackListed
    const isBlackListed = await BlackListTokenModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }

    // decode token
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        let captain = await CaptainModel.findById(decode.id);
        req.captain = captain;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized2"
        })
    }
}