import express, { Router } from 'express';
import { body } from "express-validator";
import { createRide, getJourneyDetails, confirmRide, startRide, finishRide, cancelRideByCaptain } from '../controller/ride.controller.js';
import { AuthUser } from '../middleWares/user.middleWares.js';
import {AuthCaptain } from '../middleWares/captain.middleWares.js'

const rideRouter = express.Router();

rideRouter.route("/create").post([
    // body("userId").isString().isLength({min: 24, max: 24}).withMessage("invalid user id"),
    body("pickup").isString().isLength({min: 3}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid destination location"),
    body("vehicleType").isString().isIn(['auto', 'car', 'motorcycle']).withMessage("invalid vehicle type"),
    body("fare").isNumeric().withMessage('invalid fare'),
    body("time").isNumeric().withMessage("invalid duration"),
    body("distance").isNumeric().withMessage("invalid distance")
], AuthUser, createRide)

rideRouter.route("/get-journey-details").post([
    body("pickup").isString().isLength({min: 3}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid pickup location")
], getJourneyDetails)

rideRouter.route("/confirm-ride").post([
    body("userId").isString().isLength({min: 5}).withMessage("invalid user id"),
    body("captainId").isString().isLength({min: 5}).withMessage("invalid captain id"),
    body("rideId").isString().isLength({min: 5}).withMessage("invalid ride id")
], AuthCaptain, confirmRide)

rideRouter.route("/start-ride").post([
    body("otp").trim().isString().isLength({min:6, max:6}).withMessage("invalid otp"),
    body("rideId").isMongoId().withMessage("invalid ride id")
], AuthCaptain, startRide)

rideRouter.route("/finish-ride").post([
    body("rideId").isMongoId().withMessage("invalid ride id")
], AuthCaptain, finishRide)

rideRouter.route("/cancel-ride").post([
   body("rideId").isMongoId().withMessage("invalid ride id") 
], AuthCaptain, cancelRideByCaptain)

export default rideRouter;