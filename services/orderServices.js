import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";

export const orderServices = {
    placeOrder: async (orderData) => {
        const order = new orderModel(orderData)
        return await order.save()
    },
    sellerOrder: async (sellerId) => {
        const order = await orderModel.find({seller:sellerId}).populate("buyer",'username email')
        console.log(order)
        return order
    },
    allOrder:async () => {
        const allOrder = await orderModel.find().populate('buyer','username email').populate('seller','username email').populate('pet','name price category breed')
        return allOrder
    },
    myOrder: async(buyerId)=>{
        console.log(buyerId)
        const orders = await orderModel.find({buyer:buyerId}).populate('seller','username email').populate('pet','name price category breed')
        console.log(orders,'orders')
        return orders
    },
    updateOrderStatus:async(orderId,sellerId,status)=>{
        const order = await orderModel.findOne({_id:orderId,seller:sellerId})
        if(!order){
            throw new Error("Order not found or not authorized")
        };
        if(!['accepted','rejected'].includes(status)){
            throw new Error("Invalid status")
        }
        order.status = status;
        return await order.save()
    }
    
}