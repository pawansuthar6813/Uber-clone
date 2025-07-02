import { Ride as rideModel } from "../models/ride.model.js";
import { getDistanceTime } from "./maps.services.js";
import { User as userModel } from "../models/user.model.js";
import { Captain as captainModel } from "../models/captain.model.js";
import crypto from 'crypto'

export const getFareService = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const response = await getDistanceTime(pickup, destination); // must return { distanceValue: in meters, durationValue: in seconds }

  if(!response){
    throw new Error("failed to get fair 4");
  }

  const distanceInKm = Math.round(response.distanceValue / 100)/10; // round off to 1 decimal place
  const timeInMin = parseInt(response.durationValue / 60); // make integer

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto: baseFare.auto + distanceInKm * perKmRate.auto + timeInMin *1.2* perMinRate.auto,
    car: baseFare.car + distanceInKm * perKmRate.car + timeInMin * perMinRate.car,
    motorcycle: baseFare.motorcycle + distanceInKm * perKmRate.motorcycle + timeInMin *0.8* perMinRate.motorcycle,
  };

  return { fare, distanceInKm, timeInMin }

};


export const createRideService = async (
  { userId, pickup, destination, vehicleType, fare, distance, time }
) => {

  if (!userId || !pickup || !destination || !vehicleType || !fare || !distance || !time) {
    throw new Error("all fields are required to create a ride");
  }


  const response = await getFareService(pickup, destination);

  const otp = generateOptService(6).toString();
  // console.log(otp)

  const ride = await rideModel.create({
    userId,
    pickupLocation: pickup,
    destinationLocation: destination,
    otp,
    fare,
    distance,
    duration: time,
    vehicleType
  })
  // console.log("in ride service, ride: ", ride)

  return ride;
}


export const generateOptService = (digits) => {
  const max = 10 ** digits;
  const min = 10 ** (digits - 1);
  const otp = crypto.randomInt(min, max).toString().padStart(digits, '0');

  return otp;
}

export const confirmRideService = async (userId, captainId, rideId) => {
  
  const user = await userModel.findById(userId);
  const captain = await captainModel.findById(captainId);

  const ride = await rideModel.findByIdAndUpdate(rideId, {
    $set: {
      status: 'accepted',
      captainId: captain
    }
  }, {new: true}).select("+otp").populate("captainId")

  return {ride, socketId: user.socketId}
}