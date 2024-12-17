import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    trackingId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'Accepted', 'Processing', 'On The Way', 'Delivered'],
      default: 'pending',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// create index based on email
orderSchema.index({ email: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
