import { detailedLog } from '../utils/helper.js';
import chatService from './services/chatService.js';

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.onAny((event, ...args) => {
      console.log(`Event received: ${event}`, args);
    });

    socket.on('joinChat', async (users) => {
      detailedLog('this is user', users);
      const chat = await chatService.joinChat(users);
      console.log(chat, 'this i got');
      if (chat) {
        socket.emit('chatStarted', chat);
        socket.join(chat._id.toString()); // Ensure the socket joins the chat room
      } else {
        socket.emit('error', 'Unable to join chat');
      }
    });

    socket.on('sendMessage', async (messageData) => {
      try {
        console.log('inside send message');
        await chatService.sendMessage(io, socket, messageData);
      } catch (error) {
        socket.emit('error', 'Error sending message');
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

export default chatSocket;
