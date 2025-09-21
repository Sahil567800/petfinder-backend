import jwt from 'jsonwebtoken'
import { sendError } from '../helper/response.js'
import { userModel } from '../models/userModel.js'

export const authmiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return sendError(res, 401, "No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await userModel.findById(decoded.id)

        if (!user) {
            return sendError(res, 401, "Invalid token: user not found");
        }
        req.user = { id: user._id, role: user.role }
        next()
    }
    catch (error) {
        console.log(error)
        sendError(res, 401, "Unauthorized")
    }
}