import mongoose from 'mongoose';
import chatModel from '../../models/chatModel.js';
import messageModel from '../../models/messageModel.js';
import { convertValidMongoId, detailedLog } from '../../utils/helper.js';

class MessageService {
  async joinChat(users) {
    const userOneId = convertValidMongoId(users.userOneId);
    const userTwoId = convertValidMongoId(users.userTwoId);
    // create a utility fuction that convert into valid mongoose object id
    try {
      if (
        !mongoose.Types.ObjectId.isValid(userOneId) ||
        !mongoose.Types.ObjectId.isValid(userTwoId)
      ) {
        throw new Error('Invalid user IDs');
      }

      console.log('before chat find');
      let chat = await chatModel.findOne({
        participants: { $all: [userOneId, userTwoId] },
      });

      // If no chat exists, create a new one
      if (!chat) {
        chat = new chatModel({
          participants: [userOneId, userTwoId],
        });
        await chat.save();
      }
      return chat;
    } catch (error) {
      detailedLog('Error joining chat', error);
    }
  }

  async sendMessage(io, socket, messageData) {
    console.log('insde the send mesage');
    const chatId = convertValidMongoId(messageData.chatId);
    const senderId = convertValidMongoId(messageData.senderId);
    try {
      if (
        !mongoose.Types.ObjectId.isValid(chatId) ||
        !mongoose.Types.ObjectId.isValid(senderId)
      ) {
        throw new Error('Invalid chatId or senderId');
      }

      const message = new messageModel({
        chatId,
        senderId,
        content: messageData.content,
      });
      await message.save();

      const populatedMessage = await messageModel
        .find({ chatId })
        .populate('senderId'); // Ensures populated sender details
      console.log('her in service chat id is', chatId.toString());
      io
        // to(chatId).
        .emit('messages', populatedMessage);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      socket.emit('error', 'Error sending message');
    }
  }
}

const chatService = new MessageService();
export default chatService;
