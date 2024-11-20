const {pool} = require("../config/database");

const createOrder = async (order, customer_id) => {
    try {
        const query = `INSERT INTO orders (customer_id, resturant_id, order_type, total_amount, payment_status) VALUES (?,?,?,?,?);`;
        const result = await pool.execute(query, [customer_id, order.resturant_id, order.order_type, order.total_amount, order.payment_status]);
        return order 
    } catch (error) {
        console.log(error)
    }

}

const createOrderItem = async (order_item, order_id) => {

}


const OrderRepository = { createOrder};

module.exports = {OrderRepository};