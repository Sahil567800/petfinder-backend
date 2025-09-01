import validator from "validator";
import bcrypt, { hash } from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//Register controller

const register = async(req,res)=>{
    const {name,email,password} = req.body;
    const alreadyExist =  userModel.findOne(email)
    if(alreadyExist){
        return res.status(409).json({message:"User Already Exists"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message:'Please Enter a Valid Email'})
    }
    if(password.length>8){
        return res.status(400).json({message:"Password is Too Short"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
}


