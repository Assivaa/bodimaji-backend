const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Collection",
      },
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        province: { type: String, required: true },
      },
      paymentMethod: { type: String, required: true, default: "Bank Transfer" },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      isPaid: { type: Boolean, required: true, default: false },
      paidAt: { type: Date },
      isDelivered: { type: Boolean, required: true, default: false },
      deliveredAt: { type: Date },
    },
  ],
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;