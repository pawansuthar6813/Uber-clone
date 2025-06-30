import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL;
        const connectionInstance = await mongoose.connect(`${url}/${DB_NAME}`);
        console.log("mongodb connected successfully")
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export default connectDB;