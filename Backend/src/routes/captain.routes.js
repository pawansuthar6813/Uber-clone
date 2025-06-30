import express from "express";
import { body } from "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from "../controller/captain.controllers.js";
import { AuthCaptain } from "../middleWares/captain.middleWares.js";

const captainRouter = express.Router();

captainRouter.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min: 3}).withMessage("first name atleast 3 characters long"),
    body("fullName.lastName").optional().isLength({min: 3}).withMessage("last name atleast 3 characters long"),
    body("password").isLength({min: 6}).withMessage("password must be atleast 6 characters long"),
    body("vehicle.color").isLength({min: 3}).withMessage("vehicle color must be atleast 3 characters long"),
    body("vehicle.plate").isLength({min: 4}).withMessage("vehicle plate must be atleast 4 characters long"),
    body("vehicle.capacity").isInt({min: 1}).withMessage("capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("invalid vehicle type")
], registerCaptain);

// here due to validation user have to give a lastName of atleast 3 characters but in model we want that last name must be optional
// to solve this we have to use .optional() which will execute validation for lastName only if it exist

captainRouter.post("/login", [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min: 6}).withMessage("password must be atleast 6 characters long")
], loginCaptain);

captainRouter.get("/profile", AuthCaptain, getCaptainProfile);
captainRouter.get("/logout", logoutCaptain);

export default captainRouter;