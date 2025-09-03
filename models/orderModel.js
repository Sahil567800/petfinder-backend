import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "pet" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' }
}, { timestamps: true });

export const orderModel = mongoose.model('order',orderSchema);