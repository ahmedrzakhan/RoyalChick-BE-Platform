const {OrderService} = require("../Services/order.service");

const CreateOrder =async (req, res) => {
    try {
     const order =  await OrderService.saveOrder(req.body, req.user.id)
    res.send(order)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const OrderController = {CreateOrder}

  module.exports = { OrderController };