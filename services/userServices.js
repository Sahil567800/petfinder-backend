import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import { sendResetEmail } from "./emailServices.js";

export const createUser = async (userData) => {
    const { username, email, password, role } = userData;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User Already Exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
        username,
        email,
        password: hashedPassword,
        role
    });
    return await user.save();
}

export const AuthenticateUser = async (userData) => {
    console.log(userData)
    const { email, password } = userData
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error("User Not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Invalid Credentials")
    }

    const token = jwt.sign(
        { id: user._id, user: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" })

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        token,
    }
}

export const forgotPassword = async (email) => {

    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error("User Not Found")
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendResetEmail(user.email, resetLink);
    return { message: "Password reset email sent" }
}

export const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (user) {
            throw new Error('invalid token or User not found')
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword,salt)
        await userModel.save();
        return { message: "Password reset successful" }
    }
    catch (error) {
        console.log(error)
        throw new error("Invalid or expired token")
    }
}