import express, { Router } from 'express';
import { body } from "express-validator";
import { createRide, getJourneyDetails } from '../controller/ride.controller.js';
import { AuthUser } from '../middleWares/user.middleWares.js';

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

export default rideRouter;