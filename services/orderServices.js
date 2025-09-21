import { orderModel } from "../models/orderModel.js";

export const orderServices = {
    placeOrder: async (orderData) => {
        const order = new orderModel(orderData)
        return await order.save()
    }
}