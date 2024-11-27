const { OrderService } = require('../Services/order.service');

const createOrderItem = async (req, res) => {
  try {
    const order = await OrderService.saveOrderItem(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const CreateOrder = async (req, res) => {
  try {
    const order = await OrderService.saveOrder(req.body, req.user.id);
    const items = req.body.order_items;
    for (let i = 0; i < items.length; i++) {
      items[i].order_id = order.id;
      await OrderService.saveOrderItem(items[i]);

    }
    res.send({ id: order.id, ...req.body});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllOrdersByCustomer = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByCustomerId(req.user.id);
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
};

const trackOrder = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.order_id);
    //get order items by order_id
    const order_items = await OrderService.getOrderItemsByOrderId(
      req.params.order_id,
    );
    res.send({ ...order[0], items: order_items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const order = await OrderService.editOrder(req.body, req.params.order_id);
    res.send(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComletedOrdersInARestaurant = async (req, res) => {
  try {
    const orders = await OrderService.getComletedOrdersInARestaurant(
      req.params.restaurant_id,
    );
    res.send(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const OrderController = {
  CreateOrder,
  createOrderItem,
  getAllOrdersByCustomer,
  trackOrder,
  editOrder,
  getComletedOrdersInARestaurant
};

module.exports = { OrderController };
