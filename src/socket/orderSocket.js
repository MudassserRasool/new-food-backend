import { getAllOrders, trackOrder } from './services/orderService.js';

const orderSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('trackOrder', (id) => trackOrder(socket, io, id));
    socket.on('getAllOrders', () => getAllOrders(socket, io));

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
};

export default orderSocket;
