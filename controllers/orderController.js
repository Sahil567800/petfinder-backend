import { sendError, sendSucces } from "../helper/response.js";
import { idValidator, orderValidator } from "../helper/validator.js";
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

export const sellerOrderController = async (req, res) => {
    try {
        const { error } = idValidator({ id: req.params.id })
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const order = await orderServices.sellerOrder(req.params.id)
        sendSucces(res, 200, "Order fetched successfully", order)
    }
    catch (error) {
        console.log(error)
        sendError(res, 400, error.message)
    }

}
export const allOrderController = async (req, res) => {
    try {
        const allOrders = await orderServices.allOrder()
        return sendSucces(res, 200, "All orders fetched successfully", allOrders)
    }
    catch (error) {
        console.error(error)
        sendError(res, 400, error.message)
    }
}
export const myOrderController = async (req, res) => {
    try {
        const id = req.user.id.toString()
        const { error } = idValidator({ id })
        console.log(error)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const myOrders = await orderServices.myOrder(req.user.id)
        return sendSucces(res, 200, "Orders fetched successfully", myOrders)
    }
    catch (error) {
        console.error(error)
        sendError(res, 400, error.message)
    }

}
export const orderUpdateStatusController = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orderServices.updateOrderStatus(orderId, sellerId, status);
        return sendSucces(res, 200, `Order ${status} succesfully`, order)
    }
    catch (error) {
        console.log(error)
        sendError(res, 400, error.message)
    }
}