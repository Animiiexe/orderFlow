import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    minlenghth: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
    maxlength: 100,
  },
  productName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  productImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
