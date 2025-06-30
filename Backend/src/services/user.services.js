import { User as userModel } from "../models/user.model.js"

export const createUser = async ({
    firstName,
    lastName,
    email,
    password
}) => {
    // check if all information is given
    if (!firstName || !email || !password) {
        throw new Error("all fields are required")
    }

    // check if email is already registered with some account or not
    const existUser = await userModel.findOne({email})
    if(existUser){
        throw new Error("email is already registered");
    }

    // save data to database
    const user = await userModel.create(
        {
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        }
    )

    // return created user
    return user;
}