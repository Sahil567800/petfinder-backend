import { sendError, sendSucces } from "../helper/response.js";
import { orderValidator } from "../helper/validator.js";
import { orderServices } from "../services/orderServices.js";

export const orderController = async (req, res) => {
    try {
        const { error } = orderValidator(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const order = await orderServices.placeOrder(req.body)
        return sendSucces(res, 201, "Order has been placed", order)
    }
    catch (error) {
        console.log(error)
        sendError(res, 500, error.message)
    }
}

