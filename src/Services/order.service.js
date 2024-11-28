const { OrderRepository } = require('../Repositories/order.repository');
const {MenuRepository} = require('../Repositories/menu.repository');
const saveOrder = async (order_item, user_id) => {
  return await OrderRepository.createOrder(order_item, user_id);
};

//Get all orders by a customer_id
const getOrdersByCustomerId = async (customer_id) => {
  return await OrderRepository.getOrdersByCustomerId(customer_id);
};
//get all completed orders in a restaurant
const getComletedOrdersInARestaurant = async (resturnt_id) => {
    return await OrderRepository.getComletedOrdersInARestaurant(resturnt_id);
}

const getNotComletedOrdersInARestaurant = async (resturnt_id) => {
  return await OrderRepository.getNotComletedOrdersInARestaurant(resturnt_id);
}
const saveOrderItem = async (order_item) => {
  return await OrderRepository.createOrderItem(order_item);
};

const getOrderById = async (order_id) => {
  return await OrderRepository.trackOrder(order_id);
};

const getOrderItemsByOrderId = async (order_id) => {
  const order_items =  await OrderRepository.getOrderItemsByOrderId(order_id);
  //popUplate order items with food items
  for (let index = 0; index < order_items.length; index++) {
    const element = order_items[index];
    element.food_item = await MenuRepository.getMenuItemById(element.item_id);
    order_items[index] = element;
  }
  return order_items;
};

const editOrder = async (order, order_id) => {
  //retrive fromal order
  const initialOrder = await OrderRepository.trackOrder(order_id);

  const editedOrdeer = {
    status: order.status ? order.status : initialOrder[0].status,
    total_amount: order.total_amount
      ? order.total_amount
      : initialOrder[0].total_amount,
    payment_status: order.payment_status ? order.payment_status : initialOrder[0][0].payment_status,
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
  getComletedOrdersInARestaurant,
  getNotComletedOrdersInARestaurant
};

module.exports = { OrderService };
