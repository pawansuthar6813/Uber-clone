import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

userSchema.statics.hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

userSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result;
}

export const User = mongoose.model("User", userSchema);