import { Captain as CaptainModel } from "../models/captain.model.js";

export const createCaptain = async (
    {
        firstName, lastName, email, password, color, plate, capacity, vehicleType 
    }
) => {
    // check if all required fields are given or not
    if(!firstName || !email || !password || !color || !plate || !vehicleType || !capacity){
        throw new Error("all fields are required");
    }

    // check if captain is already registered or not
    const isExist = await CaptainModel.findOne({email});
    if(isExist){
        throw new Error("email is already registered");
    }

    // create an entry in database
    const captain = await CaptainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}