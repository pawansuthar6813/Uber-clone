import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
    {
        fullName: {
            firstName: {
                type: String,
                required: true,
                minlength: [3, "first name must contain atleast 3 characters"]
            },
            lastName: {
                type: String,
                minlength: [3, "last name must contain atleast 3 characters"]
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [5, "email must be atleast 5 characters long"]
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "password must contain atleast 6 characters"],
            select: false
        },
        socketId : {
            type: String,
        },
        // now we have to check whether the captain is available for ride at this moment or not
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, "color must be atleast 3 characters long"]
            },
            plate: {
                type: String,
                required: true,
                minlength: [4, "plate must be 4 character long"]
            },
            capacity: {
                type: Number,
                required: true
            },
            vehicleType: {
                type: String,
                enum: ["car", "motorcycle", "auto"],
                required: true
            }
        },
        location: {
            ltd: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
        // here both lat and lng dont have required property because when captain is inactive he dont have location
    }
);

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result;
}

captainSchema.statics.hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const Captain = mongoose.model("Captain", captainSchema);