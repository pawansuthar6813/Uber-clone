import express from "express";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controller/user.controller.js";
import { body } from "express-validator";
import { AuthUser } from "../middleWares/user.middleWares.js";

const userRouter = express.Router();

userRouter.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min: 3}).withMessage("first name atleast 3 characters long"),
    body("fullName.lastName").optional().isLength({min: 3}).withMessage("last name atleast 3 characters long"),
    body("password").isLength({min: 6}).withMessage("password must be atleast 6 characters long")
], registerUser);

userRouter.post("/login", [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min: 6}).withMessage("password must be atleast 6 characters long")
], loginUser);

userRouter.get("/profile", AuthUser, getUserProfile);

userRouter.get("/logout",AuthUser, logoutUser)

export default userRouter;