import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "pet" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ['accepted', 'pending', 'rejected'], default: 'pending' },
    location:{type:Object,required:true}
}, { timestamps: true });

export const orderModel = mongoose.model('order',orderSchema);