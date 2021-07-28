const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity.quantity}`
    );
    const order = await Order.insert(quantity);
    return order;
  }

  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id}, updated quantity: ${quantity}`
    );
    const order = await Order.updateById(id, quantity);
    return order;
  }

  static async deleteOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Cancelled order ${quantity.id}`
    );
    const order = await Order.deleteById(quantity);
    return order;
  }
};
