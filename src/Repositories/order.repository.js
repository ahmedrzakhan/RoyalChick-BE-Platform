const { pool } = require('../config/database');

const createOrder = async (order, customer_id) => {
  try {
    const query = `INSERT INTO orders (customer_id, restaurant_id, total_amount, payment_status) VALUES (?,?,?,?);`;
    const result = await pool.execute(query, [
      customer_id,
      order.restaurant_id,
      order.total_amount,
      order.payment_status,
    ]);
    console.log("Customer Id:" + customer_id);
    return {...order, id: result[0].insertId};
  } catch (error) {
    console.log(error);
  }
};

const getOrdersByCustomerId = async (customer_id) => {
  try {
    const query = `SELECT * FROM orders WHERE customer_id = ?;`;
    const result = await pool.execute(query, [customer_id]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const createOrderItem = async (order_item) => {
  try {
    console.log(order_item);
    const query = `INSERT INTO order_items (order_id, item_id, quantity, unit_price, total_price, special_instruction) VALUES (?,?,?,?,?, ?);`;
    const result = await pool.execute(query, [
      order_item.order_id,
      order_item.item_id,
      order_item.quantity,
      order_item.unit_price,
      order_item.total_price,
      order_item.special_instruction,
    ]);
    return order_item;
  } catch (error) {
    console.log(error);
  }
};

const trackOrder = async (order_id) => {
  try {
    const query = `SELECT * FROM orders WHERE id = ?;`;
    const result = await pool.execute(query, [order_id]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};
const getOrderItemsByOrderId = async (order_id) => {
  try {
    const query = `SELECT * FROM order_items WHERE order_id = ?;`;
    const result = await pool.execute(query, [order_id]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const editOrder = async (order, order_id) => {
  console.log(order);
  try {
    const query = `UPDATE orders SET  total_amount = ?, payment_status = ?, status=? WHERE id = ?;`;
    const result = await pool.execute(query, [
      order.total_amount,
      order.payment_status,
      order.status,
      order_id,
    ]);
    return order;
  } catch (error) {
    console.log(error);
  }
};

//get completed orders from completed orders view
const getComletedOrdersInARestaurant = async (resturnt_id) => {
    try {
        const query = `SELECT * FROM completed_orders where restaurant_id = ?;`;
        const result = await pool.execute(query, [resturnt_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

const getNotComletedOrdersInARestaurant = async (resturnt_id) => {
  try {
      const query = `SELECT * FROM not_completed_orders where restaurant_id = ?;`;
      const result = await pool.execute(query, [resturnt_id]);
      return result[0];
  } catch (error) {
      console.log(error);
  }
}

const OrderRepository = {
  createOrder,
  createOrderItem,
  getOrdersByCustomerId,
  trackOrder,
  getOrderItemsByOrderId,
  editOrder,getComletedOrdersInARestaurant,
  getNotComletedOrdersInARestaurant
};

module.exports = { OrderRepository };
