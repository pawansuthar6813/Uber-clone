import jwt from "jsonwebtoken";
import { User as userModel } from "../models/user.model.js";
import { BlackListToken as BlackListTokenModel } from "../models/blacklistToken.model.js";

export const AuthUser = async (req, res, next) => {
    // console.log(req.cookies)
    // console.log("token from cookie" + req.cookies?.UserToken)
    // console.log("token from req body" + req.body?.token)
    const token = req.body?.token || req.cookies?.UserToken || req.headers.authorization?.split(" ")[1];
    // console.log(token);
    // console.log("debug point")
    if(!token){
        return res.status(401).json({
            success: false,
            message: "unauthorized1"
        })
    }

    const isBlackListed = await BlackListTokenModel.findOne({token});
    if(isBlackListed){
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "unauthorized 2"
        })
    }
}