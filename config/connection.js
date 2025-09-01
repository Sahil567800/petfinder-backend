import mongoose from "mongoose";

export const connectionDB = async()=>{
    try{
       await mongoose.connect("mongodb://localhost:27017/petfinderDB")
       console.log('Database Connected')
    }
    catch(error){
        console.log("Database connection failed",error.message)
    }
}