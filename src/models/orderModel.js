import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencing the User model
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Referencing the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: [true, 'Please provide the product name'],
        },
      },
    ],
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal', // Referencing the Deal model (if you are offering deals)
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    address: {
      type: String,
      required: [true, 'Please provide the delivery address'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide the phone number'],
    },
    trackingId: {
      type: String,
      default: null,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
