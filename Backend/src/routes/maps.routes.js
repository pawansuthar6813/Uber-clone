import express from 'express';
import { getAutoCompleteSuggestions, getCoordinates, getDistanceAndTime } from "../controller/maps.controllers.js";
import { body } from "express-validator";
import { AuthUser } from '../middleWares/user.middleWares.js';
import { AuthCaptain } from '../middleWares/captain.middleWares.js';

const mapsRouter = express.Router();

mapsRouter.get("/get-coordinates", [
    body("address").isLength({min: 3}).withMessage("address atleast must be 3 characters long")
], AuthUser, getCoordinates);

mapsRouter.get("/get-coordinates", [
    body("address").isLength({min: 3}).withMessage("address atleast must be 3 characters long")
], AuthCaptain, getCoordinates);

mapsRouter.get("/get-distance-time", [
    body("origin").isString().isLength({min: 3}).withMessage("invalid origin"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid destination")
], AuthUser, getDistanceAndTime);

mapsRouter.get("/get-distance-time", [
    body("origin").isString().isLength({min: 3}).withMessage("invalid origin"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid destination")
], AuthCaptain, getDistanceAndTime);

mapsRouter.post("/get-suggestions",[
    body("input").isString().isLength({min: 3}).withMessage("invalid input")
], AuthUser, getAutoCompleteSuggestions)

// mapsRouter.get("/get-suggestions",[
//     body("input").isString().isLength({min: 3}).withMessage("invalid input")
// ], AuthCaptain, getAutoCompleteSuggestions)


export default mapsRouter;