const { OrderRepository } = require('../Repositories/order.repository');

const saveOrder = async (order_item, user_id) => {
  console.log('Order value');
  return await OrderRepository.createOrder(order_item, user_id);
};

//Get all orders by a customer_id
const getOrdersByCustomerId = async (customer_id) => {
  return await OrderRepository.getOrdersByCustomerId(customer_id);
};

const saveOrderItem = async (order_item) => {
  return await OrderRepository.createOrderItem(order_item);
};

const getOrderById = async (order_id) => {
  return await OrderRepository.trackOrder(order_id);
};

const getOrderItemsByOrderId = async (order_id) => {
  return await OrderRepository.getOrderItemsByOrderId(order_id);
};

const editOrder = async (order, order_id) => {
  //retrive fromal order
  const initialOrder = await OrderRepository.trackOrder(order_id);

  const editedOrdeer = {
    order_type: order.order_type
      ? order.order_type
      : initialOrder[0].order_type,
    status: order.status ? order.status : initialOrder[0].status,
    total_amount: order.total_amount
      ? order.total_amount
      : initialOrder[0].total_amount,
    payment_status: order.status ? order.status : initialOrder[0][0].status,
  };
  return await OrderRepository.editOrder(editedOrdeer, order_id);
};
const OrderService = {
  saveOrder,
  saveOrderItem,
  getOrdersByCustomerId,
  getOrderById,
  getOrderItemsByOrderId,
  editOrder,
};

module.exports = { OrderService };
