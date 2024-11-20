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

const getOrdersByCustomerId = async (customer_id) => { 
    try {
        const query = `SELECT * FROM orders WHERE customer_id = ?;`;
        const result = await pool.execute(query, [customer_id]);
        return result[0];
    } catch (error) {
        console.log(error)
    }
 }

const createOrderItem = async (order_item) => {
    try {
        console.log(order_item)
        const query = `INSERT INTO order_items (order_id, item_id, quantity, unit_price, total_price, special_instruction) VALUES (?,?,?,?,?, ?);`;
        const result = await pool.execute(query, [order_item.order_id, order_item.item_id, order_item.quantity, order_item.unit_price, order_item.total_price, order_item.special_instruction]);
        return order_item 
    } catch (error) {
        console.log(error)
    }
}

const trackOrder = async (order_id) => {
    try {
        const query = `SELECT * FROM orders WHERE id = ?;`;
        const result = await pool.execute(query, [order_id]);
        return result[0];
    } catch (error) {
        console.log(error)
    }
}
const getOrderItemsByOrderId = async (order_id) => {
    try {
        const query = `SELECT * FROM order_items WHERE order_id = ?;`;
        const result = await pool.execute(query, [order_id]);
        return result[0];
    } catch (error) {
        console.log(error)
    }
}

const editOrder = async (order, order_id) => {  
    try {
        console.log(order);
        console.log(order_id);
        const query = `UPDATE orders SET order_type = ?,  total_amount = ?, payment_status = ? WHERE id = ?;`;
        const result = await pool.execute(query, [order.order_type, order.total_amount,order.payment_status,  3]);
        return order 
    } catch (error) {
        console.log(error)
    }
 }


const OrderRepository = { createOrder, createOrderItem, getOrdersByCustomerId, trackOrder, getOrderItemsByOrderId, editOrder};

module.exports = {OrderRepository};