const {OrderRepository} = require("../Repositories/order.repository")

const saveOrder = async(order_item, user_id)=>{
    console.log("Order value")
    return await OrderRepository.createOrder(order_item, user_id);
}

const OrderService = {saveOrder} 

module.exports = {OrderService}