import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['buyer','seller','admin'],default:'buyer'}
},{timestamps:true})

export const userModel = mongoose.model("User",userSchema);