const {OrderRepository} = require("../Repositories/order.repository")

const saveOrder = async(order_item, user_id)=>{
    console.log("Order value")
    return await OrderRepository.createOrder(order_item, user_id);
}

//Get all orders by a customer_id
const getOrdersByCustomerId = async(customer_id)=>{
    return await OrderRepository.getOrdersByCustomerId(customer_id);
}

const saveOrderItem= async(order_item)=>{
    return await OrderRepository.createOrderItem(order_item);
}

const getOrderById = async(order_id)=>{
    return await OrderRepository.trackOrder(order_id);
}

const getOrderItemsByOrderId = async(order_id)=>{
    return await OrderRepository.getOrderItemsByOrderId(order_id);
}
const OrderService = {saveOrder, saveOrderItem, getOrdersByCustomerId, getOrderById, getOrderItemsByOrderId} 

module.exports = {OrderService}