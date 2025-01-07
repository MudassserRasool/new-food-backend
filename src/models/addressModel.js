import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  isEnabled: { type: Boolean, default: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const addressModel = mongoose.model('Address', addressSchema);

export default addressModel;
