import jwt from "jsonwebtoken";
import { sendError } from "../helper/response.js";
import { userModel } from "../models/userModel.js";

export const authRoleMiddleware = (allowedRoles = []) => async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return sendError(res, 401, "No token provided");

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user in DB
    const user = await userModel.findById(decoded.id);
    if (!user) return sendError(res, 401, "Invalid token: user not found");
    console.log(user)

    // 4. Check allowed roles
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        console.log(allowedRoles,'allowed roles')
      return sendError(res, 403, "Forbidden: You don`t have permission");
    }
    

    // 5. Attach user to request
    req.user = { id: user._id, role: user.role, email: user.email };

    next(); // proceed to controller
  } catch (err) {
    console.error(err);
    sendError(res, 401, "Unauthorized");
  }
};
