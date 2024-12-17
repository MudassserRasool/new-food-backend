import Order from '../../models/orderModel.js';

const trackOrder = async (socket, io, id) => {
  try {
    const orderStatus = await Order.findOne({ _id: id });
    socket.emit('orderStatus', orderStatus);
  } catch (error) {
    console.error(error);
    socket.emit('error', 'Error fetching order status.');
  }
};

// src/sockets/orderHandlers/getAllOrders.js

const getAllOrders = async (socket, io) => {
  try {
    const orders = await Order.find({});
    socket.emit('allOrders', orders.reverse());
  } catch (error) {
    console.error(error);
    socket.emit('error', 'Error fetching all orders.');
  }
};

export { getAllOrders, trackOrder };
