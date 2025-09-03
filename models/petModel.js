import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["dog", "cat", "bird", "other"], required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true })

export const petModel = mongoose.model('pet', petSchema);