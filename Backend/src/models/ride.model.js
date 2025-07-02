import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },

    pickupLocation: {
        type: String,
        required: true
    },

    destinationLocation: {
        type: String,
        required: true
    },

    fare: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    duration: {
        type: Number, // time in seconds
    },

    distance: {
        type: Number, // distance in meter
    },

    paymentId: {
        type: String
    },

    orderId: {
        type: String
    },

    signature: {
        type: String
    },
    
    otp: {
        type: String,
        select: false,
        required: true
    }
})

export const Ride = mongoose.model("Ride", rideSchema);