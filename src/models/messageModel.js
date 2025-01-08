import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    autopopulate: true,
  },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;
