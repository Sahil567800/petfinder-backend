
import { validateEmail, validateLogin, validatePassword, validateRegister } from "../helper/validator.js";
import { sendError, sendSucces } from "../helper/response.js";
import { AuthenticateUser, createUser, forgotPassword, resetPassword } from "../services/userServices.js";

//Register controller

const registerController = async (req, res) => {

    try {
        const { error } = validateRegister(req.body);
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const user = await createUser(req.body);
        sendSucces(res, 201, "User Registered Successfully")
    }
    catch (error) {
        console.error(error)
        sendError(res, 400, error.message)
    }
}

//Login controller
const loginController = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateLogin(req.body);
        if (error) {
            return sendError(res, 400, error.details[0].message);
        }
        const { user, token } = await AuthenticateUser(req.body);
        sendSucces(res, 200, "Logged in Succesfully", { user, token });
    }
    catch (error) {
        console.error(error)
        sendError(res, 400, error.message)
    }
}
// forget password

const forgotPasswordController = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateEmail(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message);
        }
        const {email} = req.body
        const result = await forgotPassword(email)
        sendSucces(res, 200, result.message);
    }
    catch (error) {
        console.log(error)
        sendError(res, 400, error.details[0].message)
    }
}

const resetPasswordController = async(req,res)=>{
    try{
        const {error} = validatePassword(req.body)
        if(error){
            sendError(res,400,error.details[0].message)
        }
        const {token} = req.params;
        const {password} = req.body;

        const result = await resetPassword(token,password);
        sendSucces(res,200,result.message)
    }
    catch(error){
        console.error(error)
        sendError(res,400,error.message)
    }
}
export { loginController, registerController, forgotPasswordController , resetPasswordController};
